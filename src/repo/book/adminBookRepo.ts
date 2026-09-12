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

function updateBookInList(
  queryClient: ReturnType<typeof useQueryClient>,
  username: string,
  book: Book,
) {
  queryClient.setQueryData<Book[]>(queryKeys.books(username), (books) =>
    books?.map((item) =>
      item.id === book.id
        ? {
            ...item,
            ...book,
          }
        : item,
    ),
  );
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

        // The new detail endpoint wants the catalog external_id, not the
        // library-entry id from the route. ensureQueryData reuses the list
        // cache if it's already warm, or fetches it if this is a direct
        // link / fresh page load with nothing cached yet.
        const books = await queryClient.ensureQueryData({
          queryKey: queryKeys.books(username),
          queryFn: getBooks,
        });

        const externalId = books.find((b) => b.id === id)?.sourceId;

        if (!externalId) {
          throw new Error(`No catalog entry found for library book ${id}.`);
        }

        const book = await getBook(externalId);

        updateBookInList(queryClient, username, book);

        return book;
      },

      enabled: canFetch,
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

      onSuccess: () => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        queryClient.invalidateQueries({
          queryKey: queryKeys.books(username),
        });

        queryClient.invalidateQueries({
          queryKey: ["search"],
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
