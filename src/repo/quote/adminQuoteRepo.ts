import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuote, updateQuote, deleteQuote } from "../../services/quotes";
import type { Quote } from "../../types/quote";

const BOOKS_KEY = ["books"];

export function useAdminCreateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookId,
      quote,
    }: {
      bookId: string;
      quote: { text: string; page: number };
    }) => createQuote(bookId, quote),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKS_KEY }),
  });
}

export function useAdminUpdateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      changes,
    }: {
      id: string;
      changes: Partial<Pick<Quote, "text" | "page" | "favorite">>;
    }) => updateQuote(id, changes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKS_KEY }),
  });
}

export function useAdminDeleteQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKS_KEY }),
  });
}
