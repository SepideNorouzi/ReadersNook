import { create } from "zustand";

import type { Quote } from "../types/quote";
import { quotes as initialQuotes } from "../data/quotes";

interface DemoQuoteStore {
  quotes: Quote[];

  addQuote: (quote: Quote) => void;

  updateQuote: (
    id: string,
    changes: Partial<Pick<Quote, "text" | "page" | "favorite">>,
  ) => void;

  deleteQuote: (id: string) => void;
}

export const useDemoQuoteStore = create<DemoQuoteStore>((set) => ({
  quotes: initialQuotes,

  addQuote: (quote) =>
    set((state) => ({
      quotes: [...state.quotes, quote],
    })),

  updateQuote: (id, changes) =>
    set((state) => ({
      quotes: state.quotes.map((quote) =>
        quote.id === id
          ? {
              ...quote,
              ...changes,
            }
          : quote,
      ),
    })),

  deleteQuote: (id) =>
    set((state) => ({
      quotes: state.quotes.filter((quote) => quote.id !== id),
    })),
}));
