import { bookRepository } from "../repo/book/bookRepo";

/**
 * Components import from here, not from repo/bookRepository directly.
 */
export function useBooks() {
  return bookRepository.useBooks();
}

export function useCreateBook() {
  return bookRepository.useCreateBook();
}

export function useUpdateBook() {
  return bookRepository.useUpdateBook();
}

export function useDeleteBook() {
  return bookRepository.useDeleteBook();
}

/**
 * Derives "is this search result already in my library" from the same
 * data useBooks() already fetched — no second query, no second cache
 * to keep in sync. Match on sourceId (the search provider's id) since
 * that's the only id you have before the book is actually saved.
 */
export function useIsBookSaved(sourceId: string | undefined) {
  const { data: books } = useBooks();
  if (!sourceId) return false;
  return books.some((book) => book.sourceId === sourceId);
}
