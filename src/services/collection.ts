import { collections } from "../data/collection";
import { getBooks } from "./books";
import type { Collection, CollectionWithBooks } from "../types/collection";
import type { Book } from "../types/book";

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollectionsWithBooks(): Promise<
  CollectionWithBooks[]
> {
  const allBooks = await getBooks();
  // O(1) lookups instead of repeated .find() per bookId
  const bookById = new Map<string, Book>(
    allBooks.map((book) => [book.id, book]),
  );

  return collections.map(({ bookIds, ...rest }) => ({
    ...rest,
    books: bookIds
      .map((id) => bookById.get(id))
      .filter((b): b is Book => Boolean(b)),
  }));
}
