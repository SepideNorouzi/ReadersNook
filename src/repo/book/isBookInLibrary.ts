import type { Book } from "../../types/book";

export function isBookInLibrary(
  books: Book[] | undefined,
  sourceId?: string,
  identity?: { title: string; author: string },
): boolean {
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
