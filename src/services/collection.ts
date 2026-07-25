// src/services/collectionService.ts
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

  return collections.map(({ bookIds, ...rest }) => ({
    ...rest,
    books: bookIds
      .map((id) => allBooks.find((b) => b.id === id))
      .filter((b): b is Book => Boolean(b)),
  }));
}
