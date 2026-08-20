import { apiFetch } from "../lib/apiClient";
import {
  mapApiBookSummaryToBook,
  mapApiBookDetailToBook,
  mapBookToCreatePayload,
  mapBookToUpdatePayload,
} from "../mappers/MapApiToBook";
import type { Book } from "../types/book";
import type { ApiBookSummary, ApiBookDetail } from "../types/api/apiBook";

export async function getBooks(): Promise<Book[]> {
  const apiBooks = await apiFetch<ApiBookSummary[]>("/books/");
  return apiBooks.map(mapApiBookSummaryToBook);
}

export async function getBook(id: string): Promise<Book> {
  const apiBook = await apiFetch<ApiBookDetail>(`/books/${id}/`);
  return mapApiBookDetailToBook(apiBook);
}

export async function createBook(
  book: Omit<Book, "id" | "addedAt">,
): Promise<Book> {
  const apiBook = await apiFetch<ApiBookSummary>("/books/create/", {
    method: "POST",
    body: mapBookToCreatePayload(book),
  });
  return mapApiBookSummaryToBook(apiBook);
}

export async function updateBook(
  id: string,
  changes: Partial<Book>,
): Promise<Book> {
  const apiBook = await apiFetch<ApiBookSummary>(`/books/${id}/update/`, {
    method: "PATCH",
    body: mapBookToUpdatePayload(changes),
  });
  return mapApiBookSummaryToBook(apiBook);
}

export async function deleteBook(id: string): Promise<void> {
  await apiFetch<void>(`/books/${id}/delete/`, { method: "DELETE" });
}
