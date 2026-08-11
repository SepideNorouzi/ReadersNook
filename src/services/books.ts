import { books } from "../data/book";
import type { Book } from "../types/book";

export async function getBooks() {
  return books;
}

export async function getBook(id: string) {
  return books.find((book) => book.id === id);
}

export async function updateBook(
  id: string,
  changes: Partial<Book>,
): Promise<Book> {
  const book = books.find((b) => b.id === id);

  if (!book) {
    throw new Error("Book not found.");
  }

  Object.assign(book, changes);

  return { ...book };
}

/**
 * Placeholder for the real backend call. Right now this just pushes
 * onto the same in-memory `books` array getBooks()/getBook() already
 * read from — so admin mode "works" today, but nothing here survives
 * a page refresh, and it's shared across whoever loads this module.
 */
export async function createBook(
  book: Omit<Book, "id" | "addedAt">,
): Promise<Book> {
  const newBook = {
    ...book,
    id: crypto.randomUUID(),
    addedAt: new Date().toISOString(),
  } as Book;

  books.push(newBook);

  return newBook;
}

/**
 * Same in-memory placeholder caveat as createBook above.
 */
export async function deleteBook(id: string): Promise<void> {
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    throw new Error("Book not found.");
  }

  books.splice(index, 1);
}
