import type { ApiAestheticPhoto } from "./apiAestheticPhoto";
import type { ApiQuoteNested } from "./apiQuote";

export type ApiBookStatus = "current" | "tbr" | "read";

// The shared catalog row — one per book, regardless of how many
// users have it in their library. Nested inside every library entry.
export type ApiCatalogBook = {
  id: number;
  external_id: string;
  title: string;
  author: string;
  summary: string;
  cover_url: string;
  total_pages: number;
  created_at: string;
  updated_at: string;
};

// GET /library/ (list). This is the "through" record: your relationship
// to a book (status, progress, rating), with the shared book nested in.
export type ApiLibraryEntry = {
  id: number; // the library entry's own pk
  book: ApiCatalogBook;
  status: ApiBookStatus;
  current_page: number;
  rating: number | null;
  added_at: string; // when YOU added it — not the book's created_at
  updated_at: string; // when your progress last changed
};

// GET /library/books/{book_pk}/
// ⚠️ Docs show no quotes/aesthetic_photos here — fields are optional
// below so a missing backend field doesn't crash the mapper. Verify
// against a real network response and tighten this once confirmed.
export type ApiLibraryEntryDetail = ApiLibraryEntry & {
  quotes?: ApiQuoteNested[];
  aesthetic_photos?: ApiAestheticPhoto[];
};

// POST /books/add/ — flat, NOT nested like the responses above.
export type ApiBookCreatePayload = {
  external_id: string;
  title: string;
  author: string;
  summary: string;
  cover_url: string;
  total_pages: number;
  status: ApiBookStatus;
  current_page: number;
  rating: number;
};

export type ApiBookCreateResponse = {
  external_id: string;
  title: string;
  author: string;
  summary: string;
  cover_url: string;
  total_pages: number;
  status: ApiBookStatus;
  current_page: number;
  rating: number | null;
};

// PUT/PATCH /library/books/{book_pk}/ — progress fields ONLY.
// The backend has no way to accept title/author/cover/total_pages here.
export type ApiLibraryUpdatePayload = Partial<{
  status: ApiBookStatus;
  current_page: number;
  rating: number;
}>;