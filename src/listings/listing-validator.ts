import { listingSchema, type ListingInput } from "./listing.schema.js";

export interface ListingValidationSuccess {
  readonly success: true;
  readonly data: ListingInput;
}
export interface ListingValidationFailure {
  readonly success: false;
  readonly errors: readonly { readonly path: string; readonly message: string }[];
}
export type ListingValidationResult = ListingValidationSuccess | ListingValidationFailure;

export function validateListing(input: unknown): ListingValidationResult {
  const result = listingSchema.safeParse(input);
  if (result.success) return { success: true, data: result.data };
  return {
    success: false,
    errors: result.error.issues.map((issue) => ({
      path: issue.path.map(String).join("."),
      message: issue.message
    }))
  };
}
