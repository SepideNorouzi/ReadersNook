import type { ApiAestheticPhoto } from "./apiAestheticPhoto";
import type { ApiQuoteNested } from "./apiQuote";

export type ApiBookStatus = "current" | "tbr" | "read";

type ApiBookCore = {
  id: number;
  title: string;
  author: string;
  summary: string;
  cover_url: string;
  total_pages: number;
};

// GET /books/ · POST /books/create/ · PATCH|PUT /books/{id}/update/
export type ApiBookSummary = ApiBookCore & {
  current_page: number;
  status: ApiBookStatus;
  rating: number | null;
  created_at: string;
  updated_at: string;
};

// GET /books/{id}/ — the only book endpoint that includes quotes + photos.
export type ApiBookDetail = ApiBookSummary & {
  quotes: ApiQuoteNested[];
  aesthetic_photos: ApiAestheticPhoto[];
};

export type ApiBookCreatePayload = Pick<
  ApiBookSummary,
  "title" | "author" | "summary" | "cover_url" | "total_pages"
>;

export type ApiBookUpdatePayload = Omit<
  ApiBookSummary,
  "id" | "created_at" | "updated_at"
>;
