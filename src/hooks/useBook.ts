import { bookRepository } from "../repo/book/bookRepo";

export function useBook(externalId: string | undefined) {
  return bookRepository.useBook(externalId);
}
