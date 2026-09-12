import { bookRepository } from "../repo/book/bookRepo";
import { isBookInLibrary } from "../repo/book/isBookInLibrary";

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

export function useIsBookSaved(
  sourceId: string | undefined,
  identity?: { title: string; author: string },
) {
  const { data: books } = useBooks();
  return isBookInLibrary(books, sourceId, identity);
}
