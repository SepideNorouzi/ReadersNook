import { useMutation } from "@tanstack/react-query";

import { useBookStore } from "../../store/demoBookStore";

import type { Quote } from "../../types/quote";

export const demoQuoteRepo = {
  useCreateQuote() {
    return useMutation({
      mutationFn: async ({
        bookId,
        quote,
      }: {
        bookId: string;
        quote: {
          text: string;
          page: number;
        };
      }) => {
        const newQuote: Quote = {
          id: crypto.randomUUID(),
          text: quote.text,
          page: quote.page,
          favorite: false,
          createdAt: new Date().toISOString(),
        };

        useBookStore.getState().updateBook(bookId, {
          quotes: [
            ...(useBookStore.getState().books.find((book) => book.id === bookId)
              ?.quotes ?? []),
            newQuote,
          ],
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
        changes: Partial<Pick<Quote, "text" | "page" | "favorite">>;
      }) => {
        const book = useBookStore
          .getState()
          .books.find((book) => book.id === bookId);

        if (!book) {
          throw new Error("Book not found");
        }

        const quotes = book.quotes.map((quote) =>
          quote.id === quoteId ? { ...quote, ...changes } : quote,
        );

        useBookStore.getState().updateBook(bookId, { quotes });
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
          .books.find((book) => book.id === bookId);

        if (!book) {
          throw new Error("Book not found");
        }

        const quotes = book.quotes.filter((quote) => quote.id !== quoteId);

        useBookStore.getState().updateBook(bookId, { quotes });
      },
    });
  },
};
