export type ApiQuote = {
  id: number;
  text: string;
  page: number;
  favorite: boolean;
  created_at: string;
  updated_at: string;
  book: number;
  created_by: number;
};

// Quotes as they appear NESTED inside GET /books/{id}/ — same fields
// as ApiQuote minus created_at/updated_at
export type ApiQuoteNested = Omit<ApiQuote, "created_at" | "updated_at">;

export type ApiQuotePayload = {
  text: string;
  page: number;
  favorite: boolean;
  book: number;
};
