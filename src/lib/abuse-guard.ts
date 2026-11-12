/**
 * In-memory abuse limits for the booking form.
 *
 * Best effort: each server instance keeps its own memory, so a sender spread across instances
 * can exceed these limits. A platform rate-limit rule is the durable control (see PLACEHOLDERS.md).
 */

const MAX_ENTRIES = 10_000;

const usedTokens = new Map<string, number>(); // token -> expiry time
const sends = new Map<string, number[]>(); // visitor key -> recent send times
let globalSends: number[] = []; // kept apart so a flood of distinct keys can never evict the global cap

function prune(now: number) {
  for (const [token, expires] of usedTokens) {
    // Deadlines follow issue time, so records are roughly in deadline order: stopping at the first
    // live one can only keep an expired record a little longer, never drop a live one.
    if (expires > now) break;
    usedTokens.delete(token);
  }
  // Maps iterate in insertion order, so dropping from the front removes the oldest entries.
  while (usedTokens.size > MAX_ENTRIES) usedTokens.delete(usedTokens.keys().next().value as string);
  while (sends.size > MAX_ENTRIES) sends.delete(sends.keys().next().value as string);
}

/**
 * Records a token as used until `deadline` (the moment it could no longer verify anyway).
 * Returns false if it was already used.
 */
export function consumeToken(token: string, now: number, deadline: number): boolean {
  prune(now);
  const expires = usedTokens.get(token);
  if (expires !== undefined && expires > now) return false;
  usedTokens.set(token, deadline);
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

/** Per-instance ceiling across all visitors, stored separately from the per-key buckets. */
export function allowGlobalSend(now: number, limit: number, windowMs: number): boolean {
  globalSends = globalSends.filter((t) => now - t < windowMs);
  if (globalSends.length >= limit) return false;
  globalSends.push(now);
  return true;
}

/** Test helper: forget every recorded token and send. */
export function resetAbuseGuard() {
  usedTokens.clear();
  sends.clear();
  globalSends = [];
}
