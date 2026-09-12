import { apiFetch } from "../lib/apiClient";
import {
  mapApiLibraryEntryToBook,
  mapApiLibraryEntryDetailToBook,
  mapBookToCreatePayload,
  mapBookToUpdatePayload,
} from "../mappers/MapApiToBook";
import type { Book } from "../types/book";
import type {
  ApiBookCreateResponse,
  ApiLibrary,
  ApiLibraryEntry,
  ApiLibraryEntryDetail,
} from "../types/api/apiBook";

export async function getBooks(): Promise<Book[]> {
  const library = await apiFetch<ApiLibrary>("/library/");
  return library.books.map(mapApiLibraryEntryToBook);
}

export async function getBook(id: string): Promise<Book> {
  // TEMP: backend bug on /library/books/{id}/.
  // This endpoint is keyed by catalog external_id, not the library-entry id.
  const entry = await apiFetch<ApiLibraryEntryDetail>(`/books/external/${id}/`);
  return mapApiLibraryEntryDetailToBook(entry);
}

export async function createBook(
  book: Omit<Book, "id" | "addedAt">,
): Promise<void> {
  await apiFetch<ApiBookCreateResponse>("/library/add/", {
    method: "POST",
    body: mapBookToCreatePayload(book),
  });
}

export async function updateBook(
  id: string,
  changes: Partial<Pick<Book, "status" | "currentPage" | "rating">>,
): Promise<Book> {
  const entry = await apiFetch<ApiLibraryEntry>(`/library/books/${id}/`, {
    method: "PATCH",
    body: mapBookToUpdatePayload(changes),
  });
  return mapApiLibraryEntryToBook(entry);
}

export async function deleteBook(id: string): Promise<void> {
  await apiFetch<void>(`/library/books/${id}/delete/`, { method: "DELETE" });
}
