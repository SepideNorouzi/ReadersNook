import type { Book } from "./book";

export type Collection = {
  id: string;
  name: string;
  description?: string;
  bookIds: string[];
};

// The UI never wants raw bookIds — it wants actual Book objects.
// This is the "hydrated" shape your components will consume.
export type CollectionWithBooks = Omit<Collection, "bookIds"> & {
  books: Book[];
};
