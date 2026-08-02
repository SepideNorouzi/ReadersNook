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
