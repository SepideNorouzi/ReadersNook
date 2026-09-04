import type { Book } from "./book";

export type Collection = {
  id: string;
  name: string;
  description?: string;
  bookIds: string[];
};
export type CollectionWithBooks = Omit<Collection, "bookIds"> & {
  books: Book[];
};
