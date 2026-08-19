import { apiFetch } from "../lib/apiClient";
import {
  mapApiQuoteToQuote,
  mapQuoteToCreatePayload,
  mapQuoteToUpdatePayload,
} from "../mappers/MapApiToQuote";
import type { Quote } from "../types/quote";
import type { ApiQuote } from "../types/api/apiQuote";

export async function createQuote(
  bookId: string,
  quote: { text: string; page: number },
): Promise<Quote> {
  const apiQuote = await apiFetch<ApiQuote>("/books/quotes/create/", {
    method: "POST",
    body: mapQuoteToCreatePayload({ ...quote, bookId }),
  });
  return mapApiQuoteToQuote(apiQuote);
}

export async function updateQuote(
  id: string,
  changes: Partial<Pick<Quote, "text" | "page" | "favorite">>,
): Promise<Quote> {
  const apiQuote = await apiFetch<ApiQuote>(`/books/quotes/${id}/update/`, {
    method: "PATCH",
    body: mapQuoteToUpdatePayload(changes),
  });
  return mapApiQuoteToQuote(apiQuote);
}

export async function deleteQuote(id: string): Promise<void> {
  // ⚠️ Assumed endpoint
  await apiFetch<void>(`/books/quotes/${id}/delete/`, { method: "DELETE" });
}
