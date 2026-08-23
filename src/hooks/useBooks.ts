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

export function useIsBookSaved(
  sourceId: string | undefined,
  identity?: { title: string; author: string },
) {
  const { data: books } = useBooks();
  if (!books?.length) return false;

  return books.some((book) => {
    if (sourceId && book.sourceId === sourceId) return true;
    if (
      identity &&
      book.title === identity.title &&
      book.author === identity.author
    ) {
      return true;
    }
    return false;
  });
}
