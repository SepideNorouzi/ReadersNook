import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { createQuote, updateQuote, deleteQuote, getQuotes } from "../../services/quotes";
import type { Quote, QuoteChanges, QuoteDraft } from "../../types/quote";
import { queryKeys } from "../../queries/queryKeys";
import { useAuthStore } from "../../auth/store/authStore";
import { useBooks } from "../../hooks/useBooks";

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

  useAllQuotes(enabled: boolean) {
    const username = useAuthStore((s) => s.username) ?? "";
    const { data: books = [] } = useBooks();

    // useQueries (plural) is the escape hatch for "one query per item in an
    // array whose length isn't known until render." A loop calling useQuery()
    // once per book would break the rules of hooks; this doesn't.
    const results = useQueries({
      queries: books.map((book) => ({
        queryKey: [...queryKeys.quotes(username), book.catalogId],
        queryFn: () => getQuotes(book.catalogId!),
        enabled: enabled && !!book.catalogId,
      })),
    });

    const isLoading = enabled && results.some((r) => r.isLoading);

    const data: (Quote & { bookTitle: string; bookAuthor: string })[] =
      results.flatMap((r, i) =>
        (r.data ?? []).map((quote) => ({
          ...quote,
          bookTitle: books[i].title,
          bookAuthor: books[i].author,
        })),
      );

    return { data, isLoading };
  },
};
