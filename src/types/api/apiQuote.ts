// ---- THE root shape. Everything else in this file derives from it. ----

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

// Quotes as they appear NESTED inside GET /books/{id}/ — same fields as
// ApiQuote, just without timestamps.
export type ApiQuoteNested = Omit<ApiQuote, "created_at" | "updated_at">;

// Body for PUT/PATCH /books/{id}/quotes/{quote_pk}/update/
export type ApiQuoteUpdatePayload = Pick<
  ApiQuote,
  "text" | "page" | "favorite" | "book"
>;

// Body for POST /books/{id}/quotes/create/ — everything ApiQuoteUpdatePayload
// has, MINUS `book`. The id in the URL path is how the backend knows which
// book this belongs to at creation time, so it's never repeated in the body.
export type ApiQuoteCreatePayload = Omit<ApiQuoteUpdatePayload, "book">;
