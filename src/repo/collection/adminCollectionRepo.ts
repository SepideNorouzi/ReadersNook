import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCollection,
  addBookToCollection,
  removeBookFromCollection,
  renameCollection,
  deleteCollection,
  getCollections,
  getCollectionDetail,
} from "../../services/collection";
import { queryKeys } from "../../queries/queryKeys";
import { useAuthStore } from "../../auth/store/authStore";
import type { CollectionWithBooks } from "../../types/collection";

function collectionsKeyForCurrentUser() {
  const username = useAuthStore.getState().username;
  return username
    ? queryKeys.collections(username)
    : (["collections", "anonymous"] as const);
}

export const adminCollectionRepo = {
  useCollections(isAdmin: boolean) {
    const username = useAuthStore((state) => state.username);
    const queryEnabled = isAdmin && Boolean(username);

    return useQuery<CollectionWithBooks[]>({
      queryKey: username
        ? queryKeys.collections(username)
        : ["collections", "anonymous"],

      queryFn: async () => {
        const collections = await getCollections();

        return Promise.all(
          collections.map((collection) => getCollectionDetail(collection.id)),
        );
      },

      enabled: queryEnabled,
    });
  },

  useCreateCollection() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: createCollection,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: collectionsKeyForCurrentUser(),
        });
      },
    });
  },

  useAddBookToCollection() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        collectionId,
        bookId,
      }: {
        collectionId: string;
        bookId: string;
      }) => addBookToCollection(collectionId, bookId),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: collectionsKeyForCurrentUser(),
        });
      },
    });
  },

  useRemoveBookFromCollection() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        collectionId,
        bookId,
      }: {
        collectionId: string;
        bookId: string;
      }) => removeBookFromCollection(collectionId, bookId),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: collectionsKeyForCurrentUser(),
        });
      },
    });
  },

  useRenameCollection() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        collectionId,
        name,
      }: {
        collectionId: string;
        name: string;
      }) => renameCollection(collectionId, name),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: collectionsKeyForCurrentUser(),
        });
      },
    });
  },

  useDeleteCollection() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (collectionId: string) => deleteCollection(collectionId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: collectionsKeyForCurrentUser(),
        });
      },
    });
  },
};
