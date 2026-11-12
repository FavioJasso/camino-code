/**
 * In-memory abuse limits for the booking form.
 *
 * Best effort: each server instance keeps its own memory, so a sender spread across instances
 * can exceed these limits. A platform rate-limit rule is the durable control (see PLACEHOLDERS.md).
 */

const MAX_ENTRIES = 10_000;

const usedTokens = new Map<string, number>(); // token -> expiry time
const sends = new Map<string, number[]>(); // visitor key -> recent send times

function prune(now: number) {
  for (const [token, expires] of usedTokens) if (expires <= now) usedTokens.delete(token);
  // Maps iterate in insertion order, so dropping from the front removes the oldest entries.
  while (usedTokens.size > MAX_ENTRIES) usedTokens.delete(usedTokens.keys().next().value as string);
  while (sends.size > MAX_ENTRIES) sends.delete(sends.keys().next().value as string);
}

/** Records a token as used. Returns false if it was already used and has not yet expired. */
export function consumeToken(token: string, now: number, ttlMs: number): boolean {
  prune(now);
  const expires = usedTokens.get(token);
  if (expires !== undefined && expires > now) return false;
  usedTokens.set(token, now + ttlMs);
  return true;
}

/** Sliding-window limit per visitor. Returns false once `limit` sends happened within `windowMs`. */
export function allowSend(key: string, now: number, limit: number, windowMs: number): boolean {
  prune(now);
  const recent = (sends.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    sends.set(key, recent);
    return false;
  }
  recent.push(now);
  sends.delete(key); // re-insert so this key counts as the newest
  sends.set(key, recent);
  return true;
}

/** Test helper: forget every recorded token and send. */
export function resetAbuseGuard() {
  usedTokens.clear();
  sends.clear();
}
