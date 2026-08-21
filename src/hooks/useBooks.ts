import { bookRepository } from "../repo/book/bookRepo";

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

export function useIsBookSaved(sourceId: string | undefined) {
  const { data: books } = useBooks();
  if (!sourceId) return false;
  return books.some((book) => book.sourceId === sourceId);
}
