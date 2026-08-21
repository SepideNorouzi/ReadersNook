import { bookRepository } from "../repo/book/bookRepo";

export function useBook(id: string | undefined) {
  return bookRepository.useBook(id);
}
