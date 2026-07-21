import { books } from "../data/book";

export async function getBooks() {
  return books;
}

export async function getBook(id: string) {
  return books.find((book) => book.id === id);
}
