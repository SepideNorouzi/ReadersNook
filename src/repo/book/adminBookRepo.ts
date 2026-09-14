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

function updateBookInList(
  queryClient: ReturnType<typeof useQueryClient>,
  username: string,
  book: Book,
) {
  queryClient.setQueryData<Book[]>(
    queryKeys.books(username),
    (books) =>
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
      queryKey: username
        ? queryKeys.books(username)
        : ["books", "anonymous"],

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

  /**
   * `externalId` is the identifier used by the /book/:id route.
   *
   * SearchResultCard -> external id
   * BookCard         -> external id
   *
   * For an already-owned book we resolve that external id to the
   * catalog/database id through the library cache.
   */
  useBook(externalId: string | undefined, enabled = true) {
    const queryClient = useQueryClient();
    const username = useAuthStore((state) => state.username);

    const canFetch =
      enabled && Boolean(username) && Boolean(externalId);

    const {
      data,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey:
        username && externalId
          ? queryKeys.book(username, externalId)
          : ["books", "anonymous", "detail"],

      queryFn: async () => {
        if (!externalId || !username) {
          throw new Error(
            "Cannot fetch book without an authenticated user.",
          );
        }

        /**
         * Load the user's library first.
         *
         * This gives us:
         * Book.id       -> library entry id
         * Book.catalogId -> catalog/database id
         * Book.sourceId  -> external id
         */
        const books = await queryClient.ensureQueryData({
          queryKey: queryKeys.books(username),
          queryFn: getBooks,
        });

        const owned = books.find(
          (book) => book.sourceId === externalId,
        );

        let book: Book;

        if (owned?.catalogId) {
          /**
           * Already in the user's library.
           * Use the real catalog/database id.
           */
          book = await getBookByDatabaseId(
            Number(owned.catalogId),
          );
        } else {
          /**
           * Search result that has not been added to this user's
           * library yet.
           *
           * The backend resolves the external id.
           */
          book = await getBookByExternalId(externalId);
        }

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

        /**
         * The POST succeeded, so force the library to refetch.
         */
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
        changes: Partial<
          Pick<Book, "status" | "currentPage" | "rating">
        >;
      }) => updateReadingProgress(id, changes),

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