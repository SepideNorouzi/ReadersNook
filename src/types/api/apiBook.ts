import type { BookStatus } from "../book";
import type { ApiAestheticPhoto } from "./apiAestheticPhoto";
import type { ApiQuoteNested } from "./apiQuote";
import type { ApiCatalogPreview } from "./apiSearch";

export type ApiBookStatus = BookStatus;

/**
 * Shared catalog book.
 *
 * This is the backend book/catalog record.
 */
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
  genres: string[];
  rating: number;
};

/**
 * One user's relationship with a catalog book.
 *
 * IMPORTANT:
 * id      -> library-entry id
 * book.id -> catalog/database id
 */
export type ApiLibraryEntry = {
  id: number;
  book: ApiCatalogBook;
  status: ApiBookStatus;
  current_page: number;
  added_at: string;
  updated_at: string;
};

/**
 * GET /books/{id}/
 * GET /books/external/{external_id}/
 */
export type ApiCatalogBookDetail = ApiCatalogPreview & {
  id: number;

  user_book:
    | (ApiLibraryEntry & {
        quotes?: ApiQuoteNested[];
        aesthetic_photos?: ApiAestheticPhoto[];
      })
    | null;
};

/**
 * POST /library/add/
 */
export type ApiBookCreatePayload = {
  external_id: string;
  title?: string;
  author?: string;
  summary?: string;
  cover_url?: string;
  total_pages?: number;
  genres?: string[];
  status?: ApiBookStatus;
  current_page?: number;
  rating?: number;
};

export type ApiBookCreateResponse = ApiLibraryEntry;

/**
 * PATCH /books/{id}/update/
 *
 * `id` is the catalog/database book id (see services/books.ts).
 */
export type ApiLibraryBookUpdatePayload = Partial<{
  status: ApiBookStatus;
  current_page: number;
}>;

/**
 * Collection summary returned from /library/.
 */
export type ApiLibraryCollectionSummary = {
  id: number;
  name: string;
  description: string;
  books: Pick<
    ApiCatalogBook,
    "id" | "external_id" | "title" | "author" | "cover_url" | "total_pages"
  >[];
  library: number;
  created_at: string;
  updated_at: string;
};

/**
 * GET /library/
 */
export type ApiLibrary = {
  id: number;
  books: ApiLibraryEntry[];
  collections: ApiLibraryCollectionSummary[];
  created_at: string;
  updated_at: string;
};
