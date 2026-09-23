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
        if (username) {
          const books = await queryClient.ensureQueryData({
            queryKey: queryKeys.books(username),
            queryFn: getBooks,
          });
          if (!books.some((book) => book.id === id)) {
            throw new Error("Cannot update a book that is not in the library.");
          }
        }
        return updateReadingProgress(id, {
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

        // Snapshot every matching query (list + detail), not just the list,
        // so onError can roll back whichever ones we actually touched.
        const previousData = queryClient.getQueriesData<Book[] | Book>({
          queryKey: queryKeys.books(username),
        });

        queryClient.setQueriesData<Book[] | Book | undefined>(
          { queryKey: queryKeys.books(username) },
          (cached) => {
            if (!cached) return cached;
            const patch = (b: Book): Book =>
              b.id === id ? { ...b, ...changes } : b;
            return Array.isArray(cached) ? cached.map(patch) : patch(cached);
          },
        );

        return { username, previousData };
      },

      onError: (_error, _variables, context) => {
        context?.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      },

      onSettled: () => {
        const username = useAuthStore.getState().username;
        if (!username) return;
        queryClient.invalidateQueries({ queryKey: queryKeys.books(username) });
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
