// Client-safe: types and limits shared by the form (client) and the server action. Keep node-only imports out of this file.

export type Booking = {
  name: string;
  email: string;
  business: string;
  phone?: string;
  lookAt?: string;
  referrer?: string;
};

export type BookingErrors = Partial<Record<keyof Booking | "form", string>>;

export const LIMITS = { name: 100, email: 254, business: 200, phone: 40, lookAt: 2000, referrer: 100 } as const;

/** A form token must be at least this old when the server reads it. The form waits this long before it sends one. */
export const MIN_AGE_MS = 3_000;
/** And at most this old. The form asks for a new one well before that. */
export const MAX_AGE_MS = 30 * 60 * 1000;
