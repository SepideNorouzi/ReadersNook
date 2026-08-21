import type { Quote, QuoteChanges, QuoteDraft } from "../types/quote";
import type {
  ApiQuote,
  ApiQuoteNested,
  ApiQuoteCreatePayload,
  ApiQuoteUpdatePayload,
} from "../types/api/apiQuote";

function toQuote(
  apiQuote: Pick<ApiQuote, "id" | "text" | "page" | "favorite" | "book">,
  timestamps?: { createdAt?: string; updatedAt?: string },
): Quote {
  return {
    id: String(apiQuote.id),
    text: apiQuote.text,
    page: apiQuote.page ?? 0,
    favorite: apiQuote.favorite,
    createdAt: timestamps?.createdAt,
    updatedAt: timestamps?.updatedAt,
    bookId: String(apiQuote.book),
  };
}

export function mapApiQuoteToQuote(apiQuote: ApiQuote): Quote {
  return toQuote(apiQuote, {
    createdAt: apiQuote.created_at,
    updatedAt: apiQuote.updated_at,
  });
}

export function mapApiQuoteNestedToQuote(apiQuote: ApiQuoteNested): Quote {
  return toQuote(apiQuote);
}

export function mapQuoteToCreatePayload(quote: QuoteDraft): ApiQuoteCreatePayload {
  return {
    text: quote.text,
    page: quote.page,
    favorite: false,
  };
}

export function mapQuoteToUpdatePayload(
  changes: QuoteChanges,
): Partial<ApiQuoteUpdatePayload> {
  const payload: Partial<ApiQuoteUpdatePayload> = {};
  if (changes.text !== undefined) payload.text = changes.text;
  if (changes.page !== undefined) payload.page = changes.page;
  if (changes.favorite !== undefined) payload.favorite = changes.favorite;
  return payload;
}
