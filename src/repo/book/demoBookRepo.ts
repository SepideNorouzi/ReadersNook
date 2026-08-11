import { useMutation } from "@tanstack/react-query";
import { useBookStore } from "../../store/demoBookStore";
import type { Book } from "../../types/book";

export const demoBookRepo = {
  getBooks() {
    return useBookStore.getState().books;
  },

  useBooks() {
    const books = useBookStore((state) => state.books);
    // Same shape as adminBookRepo.useBooks so bookRepository's caller
    // never has to know which mode produced this data. Demo is Zustand
    // — never actually "loading", so isLoading is always false.
    return { data: books, isLoading: false, isError: false, error: null };
  },

  getById(id: string) {
    return useBookStore.getState().books.find((book) => book.id === id);
  },

  useCreateBook() {
    return useMutation({
      mutationFn: async (book: Omit<Book, "id" | "addedAt">) => {
        const newBook = {
          ...book,
          id: crypto.randomUUID(),
          addedAt: new Date().toISOString(),
        } as Book;

        useBookStore.getState().addBook(newBook);
        return newBook;
      },
    });
  },

  useUpdateBook() {
    return useMutation({
      mutationFn: async ({
        id,
        changes,
      }: {
        id: string;
        changes: Partial<Book>;
      }) => {
        useBookStore.getState().updateBook(id, changes);
      },
    });
  },

  useDeleteBook() {
    return useMutation({
      mutationFn: async (id: string) => {
        useBookStore.getState().deleteBook(id);
      },
    });
  },
};
