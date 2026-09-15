import { apiFetch } from "../lib/apiClient";

import {
  mapApiLibraryEntryToBook,
  mapApiCatalogBookDetailToBook,
  mapBookToCreatePayload,
  type CatalogDetailLibraryEntry,
} from "../mappers/MapApiToBook";

import type { Book } from "../types/book";

import type {
  ApiBookCreateResponse,
  ApiCatalogBookDetail,
  ApiLibrary,
  ApiLibraryBookUpdatePayload,
} from "../types/api/apiBook";

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
 * `id` is the library-entry id, NOT the catalog/book id.
 *
 * Only status and current_page are sent
 */
export async function updateReadingProgress(
  id: string,
  changes: UpdateReadingProgressChanges,
): Promise<ApiLibraryBookUpdatePayload> {
  const payload: ApiLibraryBookUpdatePayload = {};

  if (changes.status !== undefined) {
    payload.status = changes.status;
  }

  if (changes.currentPage !== undefined) {
    const currentPage = Math.max(0, Math.round(changes.currentPage));

    payload.current_page = currentPage;
  }

  if (Object.keys(payload).length === 0) {
    throw new Error("No reading progress changes were provided.");
  }

  return apiFetch<ApiLibraryBookUpdatePayload>(
    `/books/${encodeURIComponent(id)}/update/`,
    {
      method: "PATCH",
      body: payload,
    },
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
