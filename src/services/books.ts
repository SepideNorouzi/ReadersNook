import { apiFetch } from "../lib/apiClient";

import {
  mapApiLibraryEntryToBook,
  mapApiCatalogBookDetailToBook,
  mapBookToCreatePayload,
  mapApiSearchResult,
  type CatalogDetailLibraryEntry,
} from "../mappers/MapApiToBook";

import type { Book } from "../types/book";
import type { BookSearchResult } from "../types/searchResults";

import type {
  ApiBookCreateResponse,
  ApiCatalogBookDetail,
  ApiLibrary,
  ApiLibraryBookUpdatePayload,
} from "../types/api/apiBook";
import type { ApiSearchResponse } from "../types/api/apiSearch";

export type UpdateReadingProgressChanges = Partial<
  Pick<Book, "status" | "currentPage">
>;

/**
 * GET /library/
 *
 * Returns the current user's library entries.
 */
export async function getBooks(): Promise<Book[]> {
  const library = await apiFetch<ApiLibrary>("/library/");

  return library.books.map(mapApiLibraryEntryToBook);
}

/**
 * GET /books/{id}/
 *
 * `id` is the backend catalog/database id.
 */
export async function getBookByDatabaseId(
  id: number,
  libraryEntry?: CatalogDetailLibraryEntry,
): Promise<Book> {
  const entry = await apiFetch<ApiCatalogBookDetail>(
    `/books/${encodeURIComponent(String(id))}/`,
  );

  return mapApiCatalogBookDetailToBook(entry, libraryEntry);
}

/**
 * GET /books/external/{external_id}/
 */
export async function getBookByExternalId(externalId: string): Promise<Book> {
  const entry = await apiFetch<ApiCatalogBookDetail>(
    `/books/external/${encodeURIComponent(externalId)}/`,
  );

  return mapApiCatalogBookDetailToBook(entry);
}

export type SearchPage = {
  results: BookSearchResult[];
  page: number;
  perPage: number;
  hasMore: boolean;
};

export const DEFAULT_SEARCH_PER_PAGE = 10;

/**
 * GET /search/books/
 */
export async function searchBooks(
  query: string,
  opts: { page?: number; perPage?: number } = {},
): Promise<SearchPage> {
  const trimmed = query.trim();
  const page = opts.page ?? 1;
  const perPage = opts.perPage ?? DEFAULT_SEARCH_PER_PAGE;

  if (!trimmed) {
    return { results: [], page, perPage, hasMore: false };
  }

  const params = new URLSearchParams({
    q: trimmed,
    page: String(page),
    per_page: String(perPage),
  });

  const data = await apiFetch<ApiSearchResponse>(
    `/search/books/?${params.toString()}`,
  );

  return {
    results: data.results.map(mapApiSearchResult),
    page: data.page,
    perPage: data.per_page,
    // No total count from the backend, so infer "more pages exist"
    // from whether this page came back full.
    hasMore: data.results.length === data.per_page,
  };
}

/**
 * POST /library/add/
 */
export async function createBook(
  book: Omit<Book, "id" | "addedAt">,
): Promise<void> {
  await apiFetch<ApiBookCreateResponse>("/library/add/", {
    method: "POST",
    body: mapBookToCreatePayload(book),
  });
}

/**
 * PATCH /books/{id}/update/
 *
 * `id` is the catalog/database book id — same id family as every other
 * `/books/{id}/*` route (GET detail, quotes, aesthetic_photos).
 * It is NOT the library-entry id.
 *
 * Only status and current_page are sent
 */
export async function updateReadingProgress(
  catalogBookId: string,
  changes: UpdateReadingProgressChanges,
): Promise<ApiLibraryBookUpdatePayload> {
  const payload: ApiLibraryBookUpdatePayload = {};

  if (changes.status !== undefined) {
    payload.status = changes.status;
  }

  if (changes.currentPage !== undefined) {
    payload.current_page = Math.max(0, Math.round(changes.currentPage));
  }

  if (Object.keys(payload).length === 0) {
    throw new Error("No reading progress changes were provided.");
  }

  return apiFetch<ApiLibraryBookUpdatePayload>(
    `/books/${encodeURIComponent(catalogBookId)}/update/`,
    { method: "PATCH", body: payload },
  );
}

/**
 * DELETE /library/books/{id}/
 *
 * `id` is the library-entry id.
 */
export async function deleteBook(id: string): Promise<void> {
  await apiFetch<void>(`/library/books/${encodeURIComponent(id)}/`, {
    method: "DELETE",
  });
}
