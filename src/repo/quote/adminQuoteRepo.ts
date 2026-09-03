import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuote, updateQuote, deleteQuote } from "../../services/quotes";
import type { QuoteChanges, QuoteDraft } from "../../types/quote";
import { queryKeys } from "../../queries/queryKeys";
import { useAuthStore } from "../../auth/store/authStore";

function invalidateBookQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  username: string,
  bookId: string,
) {
  queryClient.invalidateQueries({
    queryKey: queryKeys.books(username),
  });

  queryClient.invalidateQueries({
    queryKey: queryKeys.book(username, bookId),
  });
}

export const adminQuoteRepo = {
  useCreateQuote() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ bookId, quote }: { bookId: string; quote: QuoteDraft }) =>
        createQuote(bookId, quote),
      onSuccess: (_quote, { bookId }) => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        invalidateBookQueries(queryClient, username, bookId);
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
        const username = useAuthStore.getState().username;

        if (!username) return;

        invalidateBookQueries(queryClient, username, bookId);
      },
    });
  },

  useDeleteQuote() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ bookId, quoteId }: { bookId: string; quoteId: string }) =>
        deleteQuote(bookId, quoteId),
      onSuccess: (_quote, { bookId }) => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        invalidateBookQueries(queryClient, username, bookId);
      },
    });
  },
};
