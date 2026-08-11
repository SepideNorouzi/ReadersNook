import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/books";
import type { Book } from "../../types/book";

const BOOKS_KEY = ["books"];

export const adminBookRepo = {
  async getAll() {
    return await getBooks();
  },

  useBooks(enabled = true) {
    const {
      data = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: BOOKS_KEY,
      queryFn: getBooks,
      staleTime: 0, // always refetch on mount
      enabled, // ← false in demo mode. This is what skips the real
      // fetch entirely when you're not in admin mode, so a not-yet-
      // connected backend never gets hit while you're browsing demo data.
      retry: 1,
    });

    return { data, isLoading: enabled && isLoading, isError, error };
  },

  async getById(id: string) {
    return await getBook(id);
  },

  useCreateBook() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createBook,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKS_KEY }),
    });
  },

  useUpdateBook() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, changes }: { id: string; changes: Partial<Book> }) =>
        updateBook(id, changes),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKS_KEY }),
    });
  },

  useDeleteBook() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteBook,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKS_KEY }),
    });
  },
};
