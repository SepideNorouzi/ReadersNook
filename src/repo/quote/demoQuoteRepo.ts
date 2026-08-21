import { useMutation } from "@tanstack/react-query";
import { useBookStore } from "../../store/demoBookStore";
import type { Quote, QuoteChanges, QuoteDraft } from "../../types/quote";

export const demoQuoteRepo = {
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
        };

        const book = useBookStore
          .getState()
          .books.find((item) => item.id === bookId);

        useBookStore.getState().updateBook(bookId, {
          quotes: [...(book?.quotes ?? []), newQuote],
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
          .books.find((item) => item.id === bookId);

        if (!book) throw new Error("Book not found");

        useBookStore.getState().updateBook(bookId, {
          quotes: book.quotes.map((quote) =>
            quote.id === quoteId ? { ...quote, ...changes } : quote,
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
          .books.find((item) => item.id === bookId);

        if (!book) throw new Error("Book not found");

        useBookStore.getState().updateBook(bookId, {
          quotes: book.quotes.filter((quote) => quote.id !== quoteId),
        });
      },
    });
  },
};
