import { useMutation } from "@tanstack/react-query";

import { useCollectionStore } from "../../store/demoCollectionStore";
import { useBookStore } from "../../store/demoBookStore";

import type {
  Collection,
  CollectionWithBooks,
} from "../../types/collection";

export const demoCollectionRepo = {
  getCollections(): Collection[] {
    return useCollectionStore
      .getState()
      .collections;
  },

  getCollectionsWithBooks(): CollectionWithBooks[] {
    const collections =
      useCollectionStore
        .getState()
        .collections;

    const books =
      useBookStore
        .getState()
        .books;

    /*
     * Collection membership is stored using the
     * catalog/database book id.
     *
     * For newer books:
     *   Book.catalogId -> collection.bookIds
     *
     * The fallback to Book.id keeps older demo/mock
     * books usable if they do not have catalogId yet.
     */
    const bookByCatalogId =
      new Map(
        books.map((book) => [
          String(
            book.catalogId ??
              book.id,
          ),
          book,
        ]),
      );

    return collections.map(
      ({
        bookIds,
        ...collection
      }) => ({
        ...collection,

        books: bookIds
          .map((catalogBookId) =>
            bookByCatalogId.get(
              String(catalogBookId),
            ),
          )
          .filter(
            (
              book,
            ): book is (typeof books)[number] =>
              Boolean(book),
          ),
      }),
    );
  },

  useCollections() {
    const collections =
      useCollectionStore(
        (state) =>
          state.collections,
      );

    const books =
      useBookStore(
        (state) => state.books,
      );

    /*
     * Map catalog/database id -> Book.
     *
     * This matches the admin/backend contract:
     *
     * collection.bookIds
     *        ↓
     * catalogBookId
     *        ↓
     * Book.catalogId
     */
    const bookByCatalogId =
      new Map(
        books.map((book) => [
          String(
            book.catalogId ??
              book.id,
          ),
          book,
        ]),
      );

    const data: CollectionWithBooks[] =
      collections.map(
        ({
          bookIds,
          ...collection
        }) => ({
          ...collection,

          books: bookIds
            .map((catalogBookId) =>
              bookByCatalogId.get(
                String(
                  catalogBookId,
                ),
              ),
            )
            .filter(
              (
                book,
              ): book is (typeof books)[number] =>
                Boolean(book),
            ),
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
      mutationFn: async (
        name: string,
      ) => {
        const newCollection: Collection =
          {
            id: `c-${crypto.randomUUID()}`,
            name,
            bookIds: [],
          };

        useCollectionStore
          .getState()
          .addCollection(
            newCollection,
          );

        return newCollection;
      },
    });
  },

  useAddBookToCollection() {
    return useMutation({
      mutationFn: async ({
        collectionId,
        catalogBookId,
      }: {
        collectionId: string;
        catalogBookId: string;
      }) => {
        const collection =
          useCollectionStore
            .getState()
            .collections.find(
              (item) =>
                item.id ===
                collectionId,
            );

        if (!collection) {
          throw new Error(
            "Collection not found",
          );
        }

        /*
         * Store the catalog/database id,
         * not the library-entry id.
         */
        if (
          !collection.bookIds.includes(
            catalogBookId,
          )
        ) {
          const updatedCollection = {
            ...collection,
            bookIds: [
              ...collection.bookIds,
              catalogBookId,
            ],
          };

          useCollectionStore
            .getState()
            .updateCollection(
              collectionId,
              {
                bookIds:
                  updatedCollection.bookIds,
              },
            );

          return updatedCollection;
        }

        return collection;
      },
    });
  },

  useRemoveBookFromCollection() {
    return useMutation({
      mutationFn: async ({
        collectionId,
        catalogBookId,
      }: {
        collectionId: string;
        catalogBookId: string;
      }) => {
        const collection =
          useCollectionStore
            .getState()
            .collections.find(
              (item) =>
                item.id ===
                collectionId,
            );

        if (!collection) {
          throw new Error(
            "Collection not found",
          );
        }

        const updatedCollection = {
          ...collection,
          bookIds:
            collection.bookIds.filter(
              (id) =>
                id !==
                catalogBookId,
            ),
        };

        useCollectionStore
          .getState()
          .updateCollection(
            collectionId,
            {
              bookIds:
                updatedCollection.bookIds,
            },
          );

        return updatedCollection;
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
        const collection =
          useCollectionStore
            .getState()
            .collections.find(
              (item) =>
                item.id ===
                collectionId,
            );

        if (!collection) {
          throw new Error(
            "Collection not found",
          );
        }

        const updatedCollection = {
          ...collection,
          name,
        };

        useCollectionStore
          .getState()
          .updateCollection(
            collectionId,
            {
              name,
            },
          );

        return updatedCollection;
      },
    });
  },

  useDeleteCollection() {
    return useMutation({
      mutationFn: async (
        collectionId: string,
      ) => {
        const collection =
          useCollectionStore
            .getState()
            .collections.find(
              (item) =>
                item.id ===
                collectionId,
            );

        if (!collection) {
          throw new Error(
            "Collection not found",
          );
        }

        useCollectionStore
          .getState()
          .deleteCollection(
            collectionId,
          );
      },
    });
  },
};