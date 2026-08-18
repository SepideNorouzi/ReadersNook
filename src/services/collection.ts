import { collections } from "../data/collection";
import { getBooks } from "./books";

import type { Collection, CollectionWithBooks } from "../types/collection";

import type { Book } from "../types/book";

// ─────────────────────────────────────────────
// GET COLLECTIONS
// ─────────────────────────────────────────────

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

// ─────────────────────────────────────────────
// GET COLLECTIONS WITH BOOK OBJECTS
// ─────────────────────────────────────────────

export async function getCollectionsWithBooks(): Promise<
  CollectionWithBooks[]
> {
  const allBooks = await getBooks();

  const bookById = new Map<string, Book>(
    allBooks.map((book) => [book.id, book]),
  );

  return collections.map(({ bookIds, ...rest }) => ({
    ...rest,

    books: bookIds
      .map((id) => bookById.get(id))
      .filter((book): book is Book => Boolean(book)),
  }));
}

// ─────────────────────────────────────────────
// CREATE COLLECTION
// ─────────────────────────────────────────────

export async function createCollection(name: string): Promise<Collection> {
  const newCollection: Collection = {
    id: `c-${Date.now()}`,
    name,
    bookIds: [],
  };

  collections.push(newCollection);

  return newCollection;
}

// ─────────────────────────────────────────────
// ADD BOOK TO COLLECTION
// ─────────────────────────────────────────────

export async function addBookToCollection(
  collectionId: string,
  bookId: string,
): Promise<Collection> {
  const collection = collections.find(
    (collection) => collection.id === collectionId,
  );

  if (!collection) {
    throw new Error("Collection not found");
  }

  // Prevent duplicates
  if (!collection.bookIds.includes(bookId)) {
    collection.bookIds.push(bookId);
  }

  return collection;
}

// ─────────────────────────────────────────────
// REMOVE BOOK FROM COLLECTION
// ─────────────────────────────────────────────

export async function removeBookFromCollection(
  collectionId: string,
  bookId: string,
): Promise<Collection> {
  const collection = collections.find(
    (collection) => collection.id === collectionId,
  );

  if (!collection) {
    throw new Error("Collection not found");
  }

  collection.bookIds = collection.bookIds.filter((id) => id !== bookId);

  return collection;
}

// ─────────────────────────────────────────────
// RENAME COLLECTION
// ─────────────────────────────────────────────

export async function renameCollection(
  collectionId: string,
  name: string,
): Promise<Collection> {
  const collection = collections.find(
    (collection) => collection.id === collectionId,
  );

  if (!collection) {
    throw new Error("Collection not found");
  }

  collection.name = name;

  return collection;
}
