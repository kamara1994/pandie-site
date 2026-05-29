// PayPal REST API helpers — server-side only

// Live PayPal requires PAYPAL_ENV=production set explicitly.
// Defaults to sandbox in ALL other cases — dev, staging, or production without the flag.
export const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal auth failed: ${err}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// Currencies PayPal accepts for standard checkout
export const PAYPAL_SUPPORTED_CURRENCIES = new Set([
  "AUD", "BRL", "CAD", "CNY", "CZK", "DKK", "EUR", "GBP",
  "HKD", "HUF", "ILS", "JPY", "MXN", "MYR", "NOK", "NZD",
  "PHP", "PLN", "RUB", "SEK", "SGD", "THB", "TWD", "USD",
  "ZAR",
]);
