// ============================================================
// TEMPORARY DIAGNOSTIC ROUTE — DELETE AFTER DB ISSUE IS FIXED
// ============================================================
// Protected by DIAGNOSTIC_TOKEN env var.
// Does not expose secrets. Inserts and immediately deletes a test row.
// To use:
//   1. Set DIAGNOSTIC_TOKEN=any-random-string in Vercel env vars
//   2. Redeploy
//   3. Visit: https://pandiefoundation.org/api/internal/db-check?token=your-token
//   4. Read the JSON result — it tells you exactly what is failing
//   5. After fixing, delete this file and remove DIAGNOSTIC_TOKEN from Vercel
// ============================================================

import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const expected = process.env.DIAGNOSTIC_TOKEN;

  if (!expected || !token || token !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const rawKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  const report: Record<string, unknown> = {
    supabase_url_set: Boolean(rawUrl),
    supabase_url_prefix: rawUrl ? rawUrl.slice(0, 30) + "..." : "NOT SET",
    supabase_url_starts_with_https: rawUrl.startsWith("https://"),
    supabase_url_has_trailing_slash: rawUrl.endsWith("/"),
    key_set: Boolean(rawKey),
    key_prefix: rawKey ? rawKey.slice(0, 15) + "..." : "NOT SET",
    key_is_jwt: rawKey.startsWith("eyJ"),
    key_format_warning: rawKey && !rawKey.startsWith("eyJ")
      ? "KEY IS NOT A JWT. Use the service_role key from Settings → Data API → Project API Keys (eyJ...), not the sb_secret_... key from Settings → API Keys."
      : null,
  };

  const db = getDb();

  if (!db) {
    report.client_status = "NULL — env vars missing, invalid URL, or key format rejected";
    return NextResponse.json(report);
  }

  report.client_status = "created";

  // ── Test 1: SELECT from donations (read test) ──────────────────────────────
  const testCheckoutId = `diag_${Date.now()}`;

  const { data: selectData, error: selectError } = await db
    .from("donations")
    .select("id")
    .eq("provider_checkout_id", testCheckoutId)
    .limit(1);

  report.select_test = selectError
    ? { status: "FAIL", error: selectError.message, code: selectError.code }
    : { status: "OK", rows_returned: selectData?.length ?? 0 };

  if (selectError) {
    report.diagnosis = selectError.message.includes("Invalid path")
      ? "PostgREST rejected the key. This is almost always caused by using an sb_secret_... key instead of the service_role JWT. See key_format_warning above."
      : `Unexpected error: ${selectError.message}`;
    return NextResponse.json(report);
  }

  // ── Test 2: INSERT a diagnostic row ───────────────────────────────────────
  const { error: insertError } = await db.from("donations").insert({
    provider: "stripe",
    provider_checkout_id: testCheckoutId,
    donor_name: "Diagnostic",
    donor_email: "diag@pandiefoundation.internal",
    anonymous: false,
    email_updates: false,
    amount_minor: 0,
    currency: "usd",
    frequency: "one_time",
    payment_status: "pending",
    receipt_status: "not_available",
  });

  report.insert_test = insertError
    ? { status: "FAIL", error: insertError.message, code: insertError.code }
    : { status: "OK" };

  // ── Test 3: DELETE the diagnostic row ────────────────────────────────────
  if (!insertError) {
    const { error: deleteError } = await db
      .from("donations")
      .delete()
      .eq("provider", "stripe")
      .eq("provider_checkout_id", testCheckoutId);

    report.delete_test = deleteError
      ? { status: "FAIL", error: deleteError.message }
      : { status: "OK — test row cleaned up" };
  } else {
    report.delete_test = "skipped — insert failed";
  }

  // ── Overall verdict ───────────────────────────────────────────────────────
  const allOk =
    !selectError &&
    !insertError &&
    report.delete_test !== "skipped — insert failed" &&
    (report.delete_test as Record<string, string>)?.status === "OK — test row cleaned up";

  report.verdict = allOk
    ? "ALL TESTS PASSED — Supabase writes are working. Resend the Stripe webhook."
    : "ONE OR MORE TESTS FAILED — see individual test results above.";

  return NextResponse.json(report, { status: allOk ? 200 : 500 });
}
