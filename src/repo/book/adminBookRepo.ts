import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/books";

import type { Book } from "../../types/book";

import { queryKeys } from "../../queries/queryKeys";

import { useAuthStore } from "../../auth/store/authStore";

function mergeBookIntoList(
  queryClient: ReturnType<typeof useQueryClient>,
  username: string,
  book: Book,
) {
  queryClient.setQueryData<Book[]>(queryKeys.books(username), (old) => {
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
    const username = useAuthStore((state) => state.username);

    const queryEnabled = enabled && Boolean(username);

    const {
      data = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: username ? queryKeys.books(username) : ["books", "anonymous"],

      queryFn: getBooks,

      enabled: queryEnabled,

      staleTime: 0,
      retry: 1,
    });

    return {
      data,
      isLoading: queryEnabled && isLoading,
      isError,
      error,
    };
  },

  useBook(id: string | undefined, enabled = true) {
    const queryClient = useQueryClient();

    const username = useAuthStore((state) => state.username);

    const canFetch = enabled && Boolean(username) && Boolean(id);

    const { data, isLoading, isError, error } = useQuery({
      queryKey:
        username && id
          ? queryKeys.book(username, id)
          : ["books", "anonymous", "detail"],

      queryFn: async () => {
        if (!id || !username) {
          throw new Error("Cannot fetch book without an authenticated user.");
        }

        const book = await getBook(id);

        mergeBookIntoList(queryClient, username, book);

        return book;
      },

      enabled: canFetch,

      staleTime: 0,
      retry: 1,
    });

    return {
      data,
      isLoading: canFetch && isLoading,
      isError,
      error,
    };
  },

  useCreateBook() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: createBook,

      onSuccess: (created) => {
        // Read the CURRENT username.
        // Do not capture it once when the hook is created.
        const username = useAuthStore.getState().username;

        if (!username) return;

        const key = queryKeys.books(username);

        queryClient.setQueryData<Book[]>(key, (old) => {
          if (!old) {
            return [created];
          }

          if (old.some((item) => item.id === created.id)) {
            return old.map((item) =>
              item.id === created.id
                ? {
                    ...item,
                    ...created,
                  }
                : item,
            );
          }

          return [created, ...old];
        });

        queryClient.invalidateQueries({
          queryKey: key,
        });
      },
    });
  },

  useUpdateBook() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        changes,
      }: {
        id: string;
        changes: Partial<Pick<Book, "status" | "currentPage" | "rating">>;
      }) => updateBook(id, changes),

      onSuccess: (_book, { id }) => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        queryClient.invalidateQueries({
          queryKey: queryKeys.books(username),
        });

        queryClient.invalidateQueries({
          queryKey: queryKeys.book(username, id),
        });
      },
    });
  },

  useDeleteBook() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: deleteBook,

      onSuccess: () => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        queryClient.invalidateQueries({
          queryKey: queryKeys.books(username),
        });
      },
    });
  },
};
