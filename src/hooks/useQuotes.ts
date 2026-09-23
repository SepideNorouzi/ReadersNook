import { quoteRepository } from "../repo/quote/quoteRepo";

export function useBookQuotes(
  bookId: string | undefined,
  enabled = true,
) {
  return quoteRepository.useBookQuotes(bookId, enabled);
}

export function useCreateQuote() {
  return quoteRepository.useCreateQuote();
}

export function useUpdateQuote() {
  return quoteRepository.useUpdateQuote();
}

export function useDeleteQuote() {
  return quoteRepository.useDeleteQuote();
}

export function useAllQuotes() {
  return quoteRepository.useAllQuotes();
}