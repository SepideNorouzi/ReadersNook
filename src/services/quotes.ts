import { quotes } from "../data/quotes";
import type { Quote } from "../types/quote";

export async function getQuotes(): Promise<Quote[]> {
  return Promise.resolve(quotes);
}

export async function getQuote(id: string): Promise<Quote> {
  const quote = quotes.find((quote) => quote.id === id);

  if (!quote) {
    throw new Error("Quote not found");
  }

  return Promise.resolve(quote);
}
