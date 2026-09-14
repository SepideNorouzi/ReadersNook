import { apiFetch } from "../lib/apiClient";

import {
  mapApiLibraryEntryToBook,
  mapApiCatalogBookDetailToBook,
  mapBookToCreatePayload,
  mapBookToCatalogUpdatePayload,
} from "../mappers/MapApiToBook";

import type { Book } from "../types/book";

import type {
  ApiBookCreateResponse,
  ApiCatalogBook,
  ApiCatalogBookDetail,
  ApiLibrary,
} from "../types/api/apiBook";

/**
 * GET /library/
 *
 * The backend returns the user's library entries directly.
 */
export async function getBooks(): Promise<Book[]> {
  const library = await apiFetch<ApiLibrary>("/library/");

  return library.books.map(mapApiLibraryEntryToBook);
}

/**
 * Fetch a book using the backend catalog/database id.
 */
export async function getBookByDatabaseId(id: number): Promise<Book> {
  const entry = await apiFetch<ApiCatalogBookDetail>(
    `/books/${encodeURIComponent(String(id))}/`,
  );

  return mapApiCatalogBookDetailToBook(entry);
}

/**
 * Fetch a book using its external catalog id.
 */
export async function getBookByExternalId(
  externalId: string,
): Promise<Book> {
  const entry = await apiFetch<ApiCatalogBookDetail>(
    `/books/external/${encodeURIComponent(externalId)}/`,
  );

  return mapApiCatalogBookDetailToBook(entry);
}

/**
 * Add a catalog book to the current user's library.
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
 * Update shared catalog information.
 *
 * This is separate from the user's personal library state.
 */
export async function updateBookCatalogInfo(
  id: number,
  changes: Partial<
    Pick<
      Book,
      | "title"
      | "author"
      | "genres"
      | "summary"
      | "coverUrl"
      | "totalPages"
      | "rating"
    >
  >,
): Promise<ApiCatalogBook> {
  return apiFetch<ApiCatalogBook>(
    `/books/${encodeURIComponent(String(id))}/update/`,
    {
      method: "PATCH",
      body: mapBookToCatalogUpdatePayload(changes),
    },
  );
}

/**
 * Personal reading-progress update is currently not wired here because
 * the backend contract supplied for this version does not expose a
 * confirmed endpoint for it.
 */
export async function updateReadingProgress(
  _id: string,
  _changes: Partial<Pick<Book, "status" | "currentPage" | "rating">>,
): Promise<Book> {
  throw new Error(
    "No confirmed backend endpoint for updating reading progress/status yet.",
  );
}

/**
 * Delete the user's library entry.
 *
 * `id` here must be the library-entry id, not the catalog id.
 */
export async function deleteBook(id: string): Promise<void> {
  await apiFetch<void>(
    `/library/books/${encodeURIComponent(id)}/`,
    {
      method: "DELETE",
    },
  );
}