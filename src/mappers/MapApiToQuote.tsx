// mappers/mapApiToQuote.ts
import type { Quote } from "../types/quote";
import type { ApiQuote, ApiQuotePayload } from "../types/api/apiQuote";

export function mapApiQuoteToQuote(apiQuote: ApiQuote): Quote {
  return {
    id: String(apiQuote.id),
    text: apiQuote.text,
    page: apiQuote.page,
    favorite: apiQuote.favorite,
    createdAt: apiQuote.created_at,
    updatedAt: apiQuote.updated_at,
    bookId: String(apiQuote.book),
  };
}

// Full payload — used only for CREATE, where every field is required.
export function mapQuoteToCreatePayload(quote: {
  text: string;
  page: number;
  bookId: string;
}): ApiQuotePayload {
  return {
    text: quote.text,
    page: quote.page,
    favorite: false,
    book: Number(quote.bookId),
  };
}

// "only include what changed" approach so a favorite-toggle doesn't
// accidentally overwrite text/page with stale values.
export function mapQuoteToUpdatePayload(
  changes: Partial<Pick<Quote, "text" | "page" | "favorite">>,
): Partial<ApiQuotePayload> {
  const payload: Partial<ApiQuotePayload> = {};
  if (changes.text !== undefined) payload.text = changes.text;
  if (changes.page !== undefined) payload.page = changes.page;
  if (changes.favorite !== undefined) payload.favorite = changes.favorite;
  return payload;
}
