import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/books";
import type { Book } from "../../types/book";
import { BOOKS_KEY, bookDetailKey } from "./bookRepo";

function mergeBookIntoList(queryClient: ReturnType<typeof useQueryClient>, book: Book) {
  queryClient.setQueryData<Book[]>(BOOKS_KEY, (old) => {
    if (!old) return old;
    return old.map((item) =>
      item.id === book.id
        ? {
            ...item,
            quotes: book.quotes,
            aestheticImages: book.aestheticImages,
            currentPage: book.currentPage,
            status: book.status,
            rating: book.rating,
          }
        : item,
    );
  });
}

export const adminBookRepo = {
  useBooks(enabled = true) {
    const {
      data = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: BOOKS_KEY,
      queryFn: getBooks,
      staleTime: 0,
      enabled,
      retry: 1,
    });

    return { data, isLoading: enabled && isLoading, isError, error };
  },

  useBook(id: string | undefined, enabled = true) {
    const queryClient = useQueryClient();
    const canFetch = enabled && Boolean(id);

    const { data, isLoading, isError, error } = useQuery({
      queryKey: bookDetailKey(id ?? ""),
      queryFn: async () => {
        const book = await getBook(id as string);
        mergeBookIntoList(queryClient, book);
        return book;
      },
      enabled: canFetch,
      staleTime: 0,
      retry: 1,
    });

    return { data, isLoading: canFetch && isLoading, isError, error };
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
      onSuccess: (_book, { id }) => {
        queryClient.invalidateQueries({ queryKey: BOOKS_KEY });
        queryClient.invalidateQueries({ queryKey: bookDetailKey(id) });
      },
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
