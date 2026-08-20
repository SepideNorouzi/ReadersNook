import type { ApiQuoteNested } from "./apiQuote";

export type ApiBookStatus = "current" | "tbr" | "read";

// Fields present on every book response, no matter the endpoint.
type ApiBookCore = {
  id: number;
  title: string;
  author: string;
  summary: string;
  cover_url: string;
  total_pages: number;
};

// GET /books/ (list) · POST /books/create/ (response) · PATCH|PUT /books/{id}/update/ (response)
export type ApiBookSummary = ApiBookCore & {
  current_page: number;
  status: ApiBookStatus;
  rating: number;
  created_at: string;
  updated_at: string;
};

export type ApiAestheticPhoto = {
  id: number;
  book: number;
  image_url: string;
  caption: string;
  order: number;
};

// GET /books/{id}/ — the ONLY endpoint with quotes + aesthetic_photos.
export type ApiBookDetail = ApiBookSummary & {
  quotes: ApiQuoteNested[];
  aesthetic_photos: ApiAestheticPhoto[];
};

// Body for POST /books/create/ — No status/rating/current_page — the backend doesn't
// take them at creation time.
export type ApiBookCreatePayload = Pick<
  ApiBookSummary,
  "title" | "author" | "summary" | "cover_url" | "total_pages"
>;

// Body for PATCH/PUT /books/{id}/update/ — every writable field,
// excluding server-owned ones
export type ApiBookUpdatePayload = Omit<
  ApiBookSummary,
  "id" | "created_at" | "updated_at"
>;
