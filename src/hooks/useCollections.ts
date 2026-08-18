import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCollectionsWithBooks,
  createCollection,
  addBookToCollection,
  removeBookFromCollection,
  renameCollection,
} from "../services/collection";

export function useCollections() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["collections"],
    queryFn: getCollectionsWithBooks,
  });

  const createMutation = useMutation({
    mutationFn: createCollection,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },
  });

  const addBookMutation = useMutation({
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

  const removeBookMutation = useMutation({
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

  const renameMutation = useMutation({
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

  return {
    ...query,

    collections: query.data ?? [],

    // Create
    createCollection: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    // Add book
    addBookToCollection: addBookMutation.mutateAsync,
    isAddingBook: addBookMutation.isPending,

    // Remove book
    removeBookFromCollection: removeBookMutation.mutateAsync,
    isRemovingBook: removeBookMutation.isPending,

    // Rename
    renameCollection: renameMutation.mutateAsync,
    isRenaming: renameMutation.isPending,
  };
}
