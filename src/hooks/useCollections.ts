import { collectionRepository } from "../repo/collection/collectionRepo";

export function useCollections() {
  const query = collectionRepository.useCollections();

  const createMutation = collectionRepository.useCreateCollection();

  const addBookMutation = collectionRepository.useAddBookToCollection();

  const removeBookMutation = collectionRepository.useRemoveBookFromCollection();

  const renameMutation = collectionRepository.useRenameCollection();

  return {
    ...query,

    collections: query.data ?? [],

    createCollection: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    addBookToCollection: addBookMutation.mutateAsync,
    isAddingBook: addBookMutation.isPending,

    removeBookFromCollection: removeBookMutation.mutateAsync,
    isRemovingBook: removeBookMutation.isPending,

    renameCollection: renameMutation.mutateAsync,
    isRenaming: renameMutation.isPending,
  };
}
