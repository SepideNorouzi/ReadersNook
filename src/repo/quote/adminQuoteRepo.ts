import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createQuote,
  updateQuote,
  deleteQuote,
  getQuotes,
} from "../../services/quotes";

import type { Quote, QuoteChanges, QuoteDraft } from "../../types/quote";

import { queryKeys } from "../../queries/queryKeys";
import { useAuthStore } from "../../auth/store/authStore";
import { useBooks } from "../../hooks/useBooks";

export const adminQuoteRepo = {
  /**
   * Fetch all quotes belonging to one specific catalog book.
   *
   * bookId must be the backend catalog/database book id.
   * This is the query used by the book-detail page.
   */
  useBookQuotes(bookId: string | undefined, enabled = true) {
    const username = useAuthStore((state) => state.username);

    const queryEnabled =
      enabled && Boolean(username) && Boolean(bookId);

    const query = useQuery({
      queryKey:
        username && bookId
          ? queryKeys.bookQuotes(username, bookId)
          : ["quotes", "anonymous", "book"],

      queryFn: () => {
        if (!bookId) {
          throw new Error("Cannot fetch quotes without a book ID.");
        }

        return getQuotes(bookId);
      },

      enabled: queryEnabled,
    });

    return {
      data: query.data ?? [],
      isLoading: queryEnabled && query.isLoading,
      isError: query.isError,
      error: query.error,
    };
  },

  /**
   * Create a quote for one specific catalog book.
   */
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

      onSuccess: (newQuote, { bookId }) => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        const quoteQueryKey = queryKeys.bookQuotes(
          username,
          bookId,
        );

        const cachedQuotes =
          queryClient.getQueryData<Quote[]>(quoteQueryKey);

        /*
         * The book-detail page and the Quotes page use the exact
         * same per-book quote query.
         *
         * If that query already exists in the cache, update it
         * immediately so the new quote appears without waiting
         * for another network request.
         */
        if (cachedQuotes) {
          const alreadyExists = cachedQuotes.some(
            (quote) => quote.id === newQuote.id,
          );

          if (!alreadyExists) {
            queryClient.setQueryData<Quote[]>(
              quoteQueryKey,
              [...cachedQuotes, newQuote],
            );
          }

          return;
        }

        /*
         * If there is no cached result yet, let React Query fetch
         * the authoritative list when that query becomes active.
         */
        queryClient.invalidateQueries({
          queryKey: quoteQueryKey,
        });
      },
    });
  },

  /**
   * Update one quote belonging to one book.
   */
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

      onSuccess: (updatedQuote, { bookId }) => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        const quoteQueryKey = queryKeys.bookQuotes(
          username,
          bookId,
        );

        const cachedQuotes =
          queryClient.getQueryData<Quote[]>(quoteQueryKey);

        if (!cachedQuotes) {
          queryClient.invalidateQueries({
            queryKey: quoteQueryKey,
          });

          return;
        }

        queryClient.setQueryData<Quote[]>(
          quoteQueryKey,
          cachedQuotes.map((quote) =>
            quote.id === updatedQuote.id
              ? updatedQuote
              : quote,
          ),
        );
      },
    });
  },

  /**
   * Delete one quote belonging to one book.
   */
  useDeleteQuote() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        bookId,
        quoteId,
      }: {
        bookId: string;
        quoteId: string;
      }) => deleteQuote(bookId, quoteId),

      onSuccess: (_deletedQuote, { bookId, quoteId }) => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        const quoteQueryKey = queryKeys.bookQuotes(
          username,
          bookId,
        );

        const cachedQuotes =
          queryClient.getQueryData<Quote[]>(quoteQueryKey);

        if (!cachedQuotes) {
          queryClient.invalidateQueries({
            queryKey: quoteQueryKey,
          });

          return;
        }

        queryClient.setQueryData<Quote[]>(
          quoteQueryKey,
          cachedQuotes.filter(
            (quote) => quote.id !== quoteId,
          ),
        );
      },
    });
  },

  /**
   * Fetch quotes for every book in the user's library.
   *
   * This is used by the Quotes page.
   */
  useAllQuotes(enabled = true) {
    const username = useAuthStore(
      (state) => state.username,
    );

    const { data: books = [] } = useBooks();

    const results = useQueries({
      queries: books.map((book) => ({
        queryKey:
          book.catalogId && username
            ? queryKeys.bookQuotes(
                username,
                book.catalogId,
              )
            : ["quotes", "anonymous", book.id],

        queryFn: () => {
          if (!book.catalogId) {
            throw new Error(
              "Cannot fetch quotes without a catalog ID.",
            );
          }

          return getQuotes(book.catalogId);
        },

        enabled:
          enabled &&
          Boolean(username) &&
          Boolean(book.catalogId),
      })),
    });

    const isLoading =
      enabled &&
      results.some((result) => result.isLoading);

    const data: (Quote & {
      bookTitle: string;
      bookAuthor: string;
    })[] = results.flatMap((result, index) => {
      const book = books[index];

      if (!book) {
        return [];
      }

      return (result.data ?? []).map((quote) => ({
        ...quote,
        bookTitle: book.title,
        bookAuthor: book.author,
      }));
    });

    return {
      data,
      isLoading,
    };
  },
};