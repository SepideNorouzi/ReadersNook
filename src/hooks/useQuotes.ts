import {
  useAdminCreateQuote,
  useAdminUpdateQuote,
  useAdminDeleteQuote,
} from "../repo/quote/adminQuoteRepo";
export { useBookQuotes } from "./useBookQuotes";

export function useCreateQuote() {
  return useAdminCreateQuote();
}
export function useUpdateQuote() {
  return useAdminUpdateQuote();
}
export function useDeleteQuote() {
  return useAdminDeleteQuote();
}
