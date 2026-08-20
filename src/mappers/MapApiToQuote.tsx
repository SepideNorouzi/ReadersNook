import type { Quote } from "../types/quote";
import type {
  ApiQuote,
  ApiQuoteNested,
  ApiQuotePayload,
} from "../types/api/apiQuote";

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

// For quotes nested inside GET /books/{id}/. No timestamps to map.
export function mapApiQuoteNestedToQuote(apiQuote: ApiQuoteNested): Quote {
  return {
    id: String(apiQuote.id),
    text: apiQuote.text,
    page: apiQuote.page,
    favorite: apiQuote.favorite,
    createdAt: undefined,
    updatedAt: undefined,
    bookId: String(apiQuote.book),
  };
}

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

export function mapQuoteToUpdatePayload(
  changes: Partial<Pick<Quote, "text" | "page" | "favorite">>,
): Partial<ApiQuotePayload> {
  const payload: Partial<ApiQuotePayload> = {};
  if (changes.text !== undefined) payload.text = changes.text;
  if (changes.page !== undefined) payload.page = changes.page;
  if (changes.favorite !== undefined) payload.favorite = changes.favorite;
  return payload;
}
