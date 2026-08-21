import { useMutation } from "@tanstack/react-query";
import { useBookStore } from "../../store/demoBookStore";
import type { Book } from "../../types/book";

export const demoBookRepo = {
  useBooks() {
    const books = useBookStore((state) => state.books);
    return { data: books, isLoading: false, isError: false, error: null };
  },

  useBook(id: string | undefined) {
    const books = useBookStore((state) => state.books);
    const book = id ? books.find((item) => item.id === id) : undefined;
    return { data: book, isLoading: false, isError: false, error: null };
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
