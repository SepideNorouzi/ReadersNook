import type { BookStatus } from "../book";
import type { ApiAestheticPhoto } from "./apiAestheticPhoto";
import type { ApiQuoteNested } from "./apiQuote";
import type { ApiCatalogPreview } from "./apiSearch";

export type ApiBookStatus = BookStatus;

/**
 * Shared catalog book.
 * This is the actual database/catalog record.
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
  genres: string;
  rating: number;
};

/**
 * One user's library relationship to a catalog book.
 *
 * `id` is the library-entry id.
 * `book.id` is the catalog/database id.
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
 * GET /books/{id}/ and
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
 * PATCH/PUT /books/{id}/update/
 *
 * Shared catalog fields.
 */
export type ApiCatalogBookUpdatePayload = Partial<{
  external_id: string;
  title: string;
  author: string;
  genres: string[];
  summary: string;
  cover_url: string;
  total_pages: number;
  rating: number;
}>;

/**
 * Collection summary returned as part of library-related data.
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
 * The endpoint returns the user's library entries directly.
 * It is NOT a wrapper object containing `books`.
 */
export type ApiLibrary = ApiLibraryEntry[];