import { quoteRepository } from "../repo/quote/quoteRepo";

export function useCreateQuote() {
  return quoteRepository.useCreateQuote();
}

export function useUpdateQuote() {
  return quoteRepository.useUpdateQuote();
}

export function useDeleteQuote() {
  return quoteRepository.useDeleteQuote();
}
