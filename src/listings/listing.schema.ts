import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(5000),
  gameId: z.string().trim().min(2).max(80).regex(/^[a-z0-9][a-z0-9_-]*$/i),
  category: z.string().trim().min(2).max(80),
  price: z.object({
    amount: z.number().int().safe().nonnegative(),
    currency: z.string().regex(/^[A-Z]{3}$/)
  }).strict(),
  stock: z.number().int().safe().nonnegative(),
  deliveryMethod: z.enum(["manual", "automatic", "scheduled"]),
  metadata: z.record(z.string(), z.unknown()).optional()
}).strict();

export type ListingInput = z.infer<typeof listingSchema>;
