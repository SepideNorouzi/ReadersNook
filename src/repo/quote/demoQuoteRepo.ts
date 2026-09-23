import { useMutation } from "@tanstack/react-query";

import { useBookStore } from "../../store/demoBookStore";

import type { Quote, QuoteChanges, QuoteDraft } from "../../types/quote";

import { useMemo } from "react";

export const demoQuoteRepo = {
  useBookQuotes(bookId: string | undefined, enabled = true) {
    const books = useBookStore((state) => state.books);

    const book = books.find(
      (item) =>
        item.id === bookId ||
        item.catalogId === bookId ||
        item.sourceId === bookId,
    );

    return {
      data: enabled && book ? (book.quotes ?? []) : [],
      isLoading: false,
      isError: false,
      error: null,
    };
  },

  useCreateQuote() {
    return useMutation({
      mutationFn: async ({
        bookId,
        quote,
      }: {
        bookId: string;
        quote: QuoteDraft;
      }) => {
        const now = new Date().toISOString();

        const newQuote: Quote = {
          id: crypto.randomUUID(),
          text: quote.text,
          page: quote.page,
          favorite: false,
          createdAt: now,
          updatedAt: now,
          bookId,
          createdBy: "user",
        };

        const book = useBookStore
          .getState()
          .books.find(
            (item) =>
              item.id === bookId ||
              item.catalogId === bookId ||
              item.sourceId === bookId,
          );

        if (!book) {
          throw new Error("Book not found");
        }

        useBookStore.getState().updateBook(book.id, {
          quotes: [...(book.quotes ?? []), newQuote],
        });

        return newQuote;
      },
    });
  },

  useUpdateQuote() {
    return useMutation({
      mutationFn: async ({
        bookId,
        quoteId,
        changes,
      }: {
        bookId: string;
        quoteId: string;
        changes: QuoteChanges;
      }) => {
        const book = useBookStore
          .getState()
          .books.find(
            (item) =>
              item.id === bookId ||
              item.catalogId === bookId ||
              item.sourceId === bookId,
          );

        if (!book) {
          throw new Error("Book not found");
        }

        useBookStore.getState().updateBook(book.id, {
          quotes: book.quotes.map((quote) =>
            quote.id === quoteId
              ? {
                  ...quote,
                  ...changes,
                  updatedAt: new Date().toISOString(),
                }
              : quote,
          ),
        });
      },
    });
  },

  useDeleteQuote() {
    return useMutation({
      mutationFn: async ({
        bookId,
        quoteId,
      }: {
        bookId: string;
        quoteId: string;
      }) => {
        const book = useBookStore
          .getState()
          .books.find(
            (item) =>
              item.id === bookId ||
              item.catalogId === bookId ||
              item.sourceId === bookId,
          );

        if (!book) {
          throw new Error("Book not found");
        }

        useBookStore.getState().updateBook(book.id, {
          quotes: book.quotes.filter((quote) => quote.id !== quoteId),
        });
      },
    });
  },

  useAllQuotes() {
    const books = useBookStore((state) => state.books);

    const data = useMemo(
      () =>
        books.flatMap((book) =>
          (book.quotes ?? []).map((quote) => ({
            ...quote,
            bookTitle: book.title,
            bookAuthor: book.author,
          })),
        ),
      [books],
    );

    return {
      data,
      isLoading: false,
    };
  },
};
