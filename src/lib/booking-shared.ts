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
