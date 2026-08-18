import { apiFetch } from "../lib/apiClient";
import { mapApiBookToBook, mapBookToApiPayload } from "../mappers/MapApiToBook";
import type { Book } from "../types/book";
import type { ApiBook } from "../types/api/apiBook";

export async function getBooks(): Promise<Book[]> {
  const apiBooks = await apiFetch<ApiBook[]>("/books/");
  return apiBooks.map(mapApiBookToBook);
}

export async function getBook(id: string): Promise<Book> {
  const apiBook = await apiFetch<ApiBook>(`/books/${id}/`);
  return mapApiBookToBook(apiBook);
}

export async function createBook(
  book: Omit<Book, "id" | "addedAt">,
): Promise<Book> {
  const apiBook = await apiFetch<ApiBook>("/books/create/", {
    method: "POST",
    body: mapBookToApiPayload(book),
  });
  return mapApiBookToBook(apiBook);
}

export async function updateBook(
  id: string,
  changes: Partial<Book>,
): Promise<Book> {
  // PATCH, not PUT.
  const apiBook = await apiFetch<ApiBook>(`/books/${id}/update/`, {
    method: "PATCH",
    body: mapBookToApiPayload(changes),
  });
  return mapApiBookToBook(apiBook);
}

export async function deleteBook(id: string): Promise<void> {
  await apiFetch<void>(`/books/${id}/delete/`, { method: "DELETE" });
}
