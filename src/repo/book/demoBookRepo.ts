import { useMutation } from "@tanstack/react-query";
import { useBookStore } from "../../store/demoBookStore";
import type { Book } from "../../types/book";

type UpdateBookInput = {
  id: string;
  changes: Partial<Pick<Book, "status" | "currentPage" | "rating">>;
};

export const demoBookRepo = {
  useBooks() {
    const books = useBookStore((state) => state.books);

    return {
      data: books,
      isLoading: false,
      isError: false,
      error: null,
    };
  },

  useBook(id: string | undefined) {
    const books = useBookStore((state) => state.books);
    const book = id ? books.find((book) => book.id === id) : undefined;

    return {
      data: book,
      isLoading: false,
      isError: false,
      error: null,
    };
  },

  useCreateBook() {
    return useMutation({
      mutationFn: async (
        book: Omit<Book, "id" | "addedAt">,
      ): Promise<void> => {
        const newBook: Book = {
          ...book,
          id: crypto.randomUUID(),
          addedAt: new Date().toISOString(),
        };

        useBookStore.getState().addBook(newBook);
      },
    });
  },

  useUpdateBook() {
    return useMutation({
      mutationFn: async ({
        id,
        changes,
      }: UpdateBookInput): Promise<void> => {
        useBookStore.getState().updateBook(id, changes);
      },
    });
  },

  useDeleteBook() {
    return useMutation({
      mutationFn: async (id: string): Promise<void> => {
        useBookStore.getState().deleteBook(id);
      },
    });
  },
};