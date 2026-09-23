import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getBooks,
  getBookByDatabaseId,
  getBookByExternalId,
  createBook,
  updateReadingProgress,
  deleteBook,
} from "../../services/books";

import type { Book } from "../../types/book";

import { queryKeys } from "../../queries/queryKeys";
import { useAuthStore } from "../../auth/store/authStore";

type UpdateBookInput = {
  id: string;
  changes: Partial<Pick<Book, "status" | "currentPage" | "rating">>;
};

export const adminBookRepo = {
  useBooks(enabled = true) {
    const username = useAuthStore((state) => state.username);

    const queryEnabled = enabled && Boolean(username);

    const query = useQuery({
      queryKey: username ? queryKeys.books(username) : ["books", "anonymous"],

      queryFn: getBooks,

      enabled: queryEnabled,
    });

    return {
      data: query.data ?? [],
      isLoading: queryEnabled && query.isLoading,
      isError: query.isError,
      error: query.error,
    };
  },

  useBook(externalId: string | undefined, enabled = true) {
    const queryClient = useQueryClient();
    const username = useAuthStore((state) => state.username);

    const canFetch = enabled && Boolean(username) && Boolean(externalId);

    const { data, isLoading, isError, error } = useQuery({
      queryKey:
        username && externalId
          ? queryKeys.book(username, externalId)
          : ["books", "anonymous", "detail"],

      queryFn: async () => {
        if (!externalId || !username) {
          throw new Error("Cannot fetch book without an authenticated user.");
        }

        const books = await queryClient.ensureQueryData({
          queryKey: queryKeys.books(username),
          queryFn: getBooks,
        });

        const owned = books.find((book) => book.sourceId === externalId);

        if (owned?.catalogId) {
          const detail = await getBookByDatabaseId(Number(owned.catalogId), {
            id: owned.id,
            catalogId: owned.catalogId,
            sourceId: owned.sourceId,
            status: owned.status,
            currentPage: owned.currentPage,
            addedAt: owned.addedAt,
          });

          return {
            ...detail,
            id: owned.id,
            catalogId: owned.catalogId,
            sourceId: owned.sourceId,
          };
        }

        return getBookByExternalId(externalId);
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
      mutationFn: async ({ id, changes }: UpdateBookInput) => {
        const username = useAuthStore.getState().username;

        if (!username) {
          throw new Error("Cannot update reading progress: not authenticated.");
        }

        const books = await queryClient.ensureQueryData({
          queryKey: queryKeys.books(username),
          queryFn: getBooks,
        });

        const book = books.find((b) => b.id === id);

        if (!book) {
          throw new Error("Cannot update a book that is not in the library.");
        }

        if (!book.catalogId) {
          throw new Error(
            "Cannot update reading progress: missing catalog id.",
          );
        }

        return updateReadingProgress(book.catalogId, {
          status: changes.status,
          currentPage: changes.currentPage,
        });
      },

      async onMutate({ id, changes }) {
        const username = useAuthStore.getState().username;

        if (!username) return undefined;

        await queryClient.cancelQueries({
          queryKey: queryKeys.books(username),
        });

        const previousBooks = queryClient.getQueryData<Book[]>(
          queryKeys.books(username),
        );

        queryClient.setQueryData<Book[]>(queryKeys.books(username), (books) =>
          books?.map((book) =>
            book.id === id
              ? {
                  ...book,
                  ...(changes.status !== undefined && {
                    status: changes.status,
                  }),
                  ...(changes.currentPage !== undefined && {
                    currentPage: changes.currentPage,
                  }),
                }
              : book,
          ),
        );

        return {
          username,
          previousBooks,
        };
      },

      onError: (_error, _variables, context) => {
        if (!context?.username) return;

        queryClient.setQueryData<Book[]>(
          queryKeys.books(context.username),
          context.previousBooks,
        );
      },

      onSettled: (_data, _error, _variables) => {
        const username = useAuthStore.getState().username;

        if (!username) return;

        /*
         * This also invalidates the detail queries because
         * ["books", username, externalId] shares the same prefix.
         */
        queryClient.invalidateQueries({
          queryKey: queryKeys.books(username),
        });
      },
    });
  },

  useDeleteBook() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (id: string) => {
        const username = useAuthStore.getState().username;

        if (username) {
          const books = await queryClient.ensureQueryData({
            queryKey: queryKeys.books(username),
            queryFn: getBooks,
          });

          if (!books.some((book) => book.id === id)) {
            throw new Error("Cannot delete a book that is not in the library.");
          }
        }

        return deleteBook(id);
      },

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
