import { apiFetch } from "../lib/apiClient";
import {
  mapApiQuoteToQuote,
  mapQuoteToCreatePayload,
  mapQuoteToUpdatePayload,
} from "../mappers/MapApiToQuote";
import type { Quote, QuoteChanges, QuoteDraft } from "../types/quote";
import type { ApiQuote } from "../types/api/apiQuote";

export async function getQuotes(bookId: string): Promise<Quote[]> {
  const apiQuotes = await apiFetch<ApiQuote[]>(`/books/${bookId}/quotes/`);
  return apiQuotes.map(mapApiQuoteToQuote);
}

export async function createQuote(
  bookId: string,
  quote: QuoteDraft,
): Promise<Quote> {
  const apiQuote = await apiFetch<ApiQuote>(
    `/books/${bookId}/quotes/create/`,
    {
      method: "POST",
      body: mapQuoteToCreatePayload(quote),
    },
  );
  return mapApiQuoteToQuote(apiQuote);
}

export async function updateQuote(
  bookId: string,
  quoteId: string,
  changes: QuoteChanges,
): Promise<Quote> {
  const apiQuote = await apiFetch<ApiQuote>(
    `/books/${bookId}/quotes/${quoteId}/update/`,
    {
      method: "PATCH",
      body: mapQuoteToUpdatePayload(changes),
    },
  );
  return mapApiQuoteToQuote(apiQuote);
}
