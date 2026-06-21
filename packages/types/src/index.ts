export type PaymentStatus = 'pending' | 'paid' | 'expired' | 'failed';
export type BookingStatus = 'draft' | 'pending_payment' | 'confirmed' | 'cancelled' | 'expired';
export interface TripSummary { id: string; slug: string; title: string; location: string; basePrice: string; }
