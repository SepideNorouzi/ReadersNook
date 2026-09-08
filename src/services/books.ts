import { apiFetch } from "../lib/apiClient";
import {
  mapApiLibraryEntryToBook,
  mapApiLibraryEntryDetailToBook,
  mapBookToCreatePayload,
  mapBookToUpdatePayload,
} from "../mappers/MapApiToBook";
import type { Book } from "../types/book";
import type {
  ApiLibraryEntry,
  ApiLibraryEntryDetail,
} from "../types/api/apiBook";

export async function getBooks(): Promise<Book[]> {
  const entries = await apiFetch<ApiLibraryEntry[]>("/library/");
  return entries.map(mapApiLibraryEntryToBook);
}

export async function getBook(id: string): Promise<Book> {
  const entry = await apiFetch<ApiLibraryEntryDetail>(
    `/library/books/${id}/`,
  );
  return mapApiLibraryEntryDetailToBook(entry);
}

export async function createBook(
  book: Omit<Book, "id" | "addedAt">,
): Promise<Book> {
  // ⚠️ the Swagger example for this response mirrors the request body —
  // that's likely a generic placeholder, not the real shape. Confirm via
  // the network tab; the code below assumes it matches ApiLibraryEntry.
  const entry = await apiFetch<ApiLibraryEntry>("/books/add/", {
    method: "POST",
    body: mapBookToCreatePayload(book),
  });
  return {
    ...mapApiLibraryEntryToBook(entry),
    sourceId: book.sourceId,
    genres: book.genres,
  };
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
  await apiFetch<void>(`/library/books/${id}/`, { method: "DELETE" });
}