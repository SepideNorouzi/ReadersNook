export type ApiQuote = {
  id: number;
  text: string;
  page: number | null;
  favorite: boolean;
  created_at: string;
  updated_at: string;
  book: number;
  created_by: number;
};

// Nested on GET /books/{id}/ (ShortQuoteSerializer — no timestamps).
export type ApiQuoteNested = Pick<
  ApiQuote,
  "id" | "book" | "text" | "page" | "favorite" | "created_by"
>;

// PATCH /books/{id}/quotes/{quote_pk}/update/
export type ApiQuoteUpdatePayload = Pick<ApiQuote, "text" | "page" | "favorite">;

// POST /books/{id}/quotes/create/ — book comes from the URL, not the body.
export type ApiQuoteCreatePayload = ApiQuoteUpdatePayload;
