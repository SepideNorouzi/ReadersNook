import { useMutation } from "@tanstack/react-query";

import { useCollectionStore } from "../../store/demoCollectionStore";
import { useBookStore } from "../../store/demoBookStore";

import type { Collection, CollectionWithBooks } from "../../types/collection";

export const demoCollectionRepo = {
  getCollections() {
    return useCollectionStore.getState().collections;
  },

  getCollectionsWithBooks(): CollectionWithBooks[] {
    const collections = useCollectionStore.getState().collections;
    const books = useBookStore.getState().books;

    const bookById = new Map(books.map((book) => [String(book.id), book]));

    return collections.map(({ bookIds, ...collection }) => ({
      ...collection,

      books: bookIds
        .map((id) => bookById.get(String(id)))
        .filter((book): book is (typeof books)[number] => Boolean(book)),
    }));
  },

  useCollections() {
    const collections = useCollectionStore((state) => state.collections);

    const books = useBookStore((state) => state.books);

    const bookById = new Map(books.map((book) => [String(book.id), book]));

    const data: CollectionWithBooks[] = collections.map(
      ({ bookIds, ...collection }) => ({
        ...collection,

        books: bookIds
          .map((id) => bookById.get(String(id)))
          .filter((book): book is (typeof books)[number] => Boolean(book)),
      }),
    );

    return {
      data,
      collections: data,
      isLoading: false,
      isError: false,
      error: null,
    };
  },

  useCreateCollection() {
    return useMutation({
      mutationFn: async (name: string) => {
        const newCollection: Collection = {
          id: `c-${crypto.randomUUID()}`,
          name,
          bookIds: [],
        };

        useCollectionStore.getState().addCollection(newCollection);

        return newCollection;
      },
    });
  },

  useAddBookToCollection() {
    return useMutation({
      mutationFn: async ({
        collectionId,
        bookId,
      }: {
        collectionId: string;
        bookId: string;
      }) => {
        const collection = useCollectionStore
          .getState()
          .collections.find((collection) => collection.id === collectionId);

        if (!collection) {
          throw new Error("Collection not found");
        }

        if (!collection.bookIds.includes(bookId)) {
          useCollectionStore.getState().updateCollection(collectionId, {
            bookIds: [...collection.bookIds, bookId],
          });
        }

        return collection;
      },
    });
  },

  useRemoveBookFromCollection() {
    return useMutation({
      mutationFn: async ({
        collectionId,
        bookId,
      }: {
        collectionId: string;
        bookId: string;
      }) => {
        const collection = useCollectionStore
          .getState()
          .collections.find((collection) => collection.id === collectionId);

        if (!collection) {
          throw new Error("Collection not found");
        }

        useCollectionStore.getState().updateCollection(collectionId, {
          bookIds: collection.bookIds.filter((id) => id !== bookId),
        });

        return collection;
      },
    });
  },

  useRenameCollection() {
    return useMutation({
      mutationFn: async ({
        collectionId,
        name,
      }: {
        collectionId: string;
        name: string;
      }) => {
        const collection = useCollectionStore
          .getState()
          .collections.find((collection) => collection.id === collectionId);

        if (!collection) {
          throw new Error("Collection not found");
        }

        useCollectionStore.getState().updateCollection(collectionId, { name });

        return {
          ...collection,
          name,
        };
      },
    });
  },
};
