// In-memory sliding-window rate limiter.
//
// NOTE ON SCOPE: this is per-server-instance. On a single long-lived Node
// process (or a warm serverless instance) it throttles abuse effectively.
// Across many cold serverless instances the window is not shared, so for
// hard multi-instance guarantees move the store to Upstash Redis / Vercel KV
// (swap the Map for a Redis INCR+EXPIRE and keep the same signature).
// Until then this is a real, cheap first line of defence against the
// unauthenticated cost-abuse the API routes were previously wide open to.

type Hit = { count: number; resetAt: number };

const store = new Map<string, Hit>();

// Opportunistic cleanup so the Map cannot grow unbounded under attack.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, hit] of store) {
    if (hit.resetAt <= now) store.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Fixed-window limiter. `key` should already namespace the route,
 * e.g. `chatbot:1.2.3.4`.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const hit = store.get(key);

  if (!hit || hit.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (hit.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((hit.resetAt - now) / 1000)),
    };
  }

  hit.count += 1;
  return { ok: true, remaining: limit - hit.count, retryAfterSeconds: 0 };
}
