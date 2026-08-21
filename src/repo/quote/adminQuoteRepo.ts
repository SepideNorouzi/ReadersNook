import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuote, updateQuote } from "../../services/quotes";
import type { QuoteChanges, QuoteDraft } from "../../types/quote";
import { BOOKS_KEY, bookDetailKey } from "../book/bookRepo";

function invalidateBookQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  bookId: string,
) {
  queryClient.invalidateQueries({ queryKey: BOOKS_KEY });
  queryClient.invalidateQueries({ queryKey: bookDetailKey(bookId) });
}

export const adminQuoteRepo = {
  useCreateQuote() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        bookId,
        quote,
      }: {
        bookId: string;
        quote: QuoteDraft;
      }) => createQuote(bookId, quote),
      onSuccess: (_quote, { bookId }) => {
        invalidateBookQueries(queryClient, bookId);
      },
    });
  },

  useUpdateQuote() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        bookId,
        quoteId,
        changes,
      }: {
        bookId: string;
        quoteId: string;
        changes: QuoteChanges;
      }) => updateQuote(bookId, quoteId, changes),
      onSuccess: (_quote, { bookId }) => {
        invalidateBookQueries(queryClient, bookId);
      },
    });
  },

  useDeleteQuote() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({
        bookId,
        quoteId,
      }: {
        bookId: string;
        quoteId: string;
      }) => {
        void bookId;
        void quoteId;
      },
      onSuccess: (_result, { bookId }) => {
        invalidateBookQueries(queryClient, bookId);
      },
    });
  },
};
