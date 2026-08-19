import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCollectionsWithBooks,
  createCollection,
  addBookToCollection,
  removeBookFromCollection,
  renameCollection,
} from "../../services/collection";
import { COLLECTION_KEY } from "./collectionRepo";

export const adminCollectionRepo = {
  useCollections(isAdmin: boolean) {
    return useQuery({
      queryKey: COLLECTION_KEY,
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
          queryKey: COLLECTION_KEY,
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
          queryKey: COLLECTION_KEY,
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
          queryKey: COLLECTION_KEY,
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
          queryKey: COLLECTION_KEY,
        });
      },
    });
  },
};
