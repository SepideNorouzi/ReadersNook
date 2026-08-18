import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCollectionsWithBooks,
  createCollection,
  addBookToCollection,
  removeBookFromCollection,
  renameCollection,
} from "../../services/collection";

export const adminCollectionRepo = {
  useCollections(isAdmin: boolean) {
    return useQuery({
      queryKey: ["collections"],
      queryFn: getCollectionsWithBooks,
      enabled: isAdmin,
    });
  },

  useCreateCollection() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: createCollection,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["collections"],
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
          queryKey: ["collections"],
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
          queryKey: ["collections"],
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
          queryKey: ["collections"],
        });
      },
    });
  },
};
