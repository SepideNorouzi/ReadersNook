import { describe, it, expect, beforeEach } from "vitest";
import { resetCollectionsDb } from "../data/handlers";
import {
  getCollections,
  getCollectionDetail,
  createCollection,
  renameCollection,
  addBookToCollection,
  removeBookFromCollection,
} from "./collection";
import { mockApiCollection, mockApiCatalogBook } from "../test/fixtures";

beforeEach(() => resetCollectionsDb());

describe("collection service", () => {
  it("creates a collection", async () => {
    const created = await createCollection("Cozy Fantasy");

    expect(created.name).toBe("Cozy Fantasy");
    expect(created.bookIds).toEqual([]);
  });

  it("fetches all collections", async () => {
    resetCollectionsDb([
      mockApiCollection({ id: 1 }),
      mockApiCollection({ id: 2 }),
    ]);

    const collections = await getCollections();

    expect(collections).toHaveLength(2);
    expect(collections[0].id).toBe("1");
    expect(collections[1].id).toBe("2");
  });

  it("fetches a collection with books nested", async () => {
    resetCollectionsDb([
      mockApiCollection({
        id: 1,
        books: [mockApiCatalogBook({ id: 5 })],
      }),
    ]);

    const collection = await getCollectionDetail("1");

    expect(collection.books).toHaveLength(1);
    expect(collection.books[0].id).toBe("5");
  });

  it("adds a book to a collection", async () => {
    resetCollectionsDb([
      mockApiCollection({
        id: 1,
        books: [],
      }),
    ]);

    await addBookToCollection("1", "5");

    const collection = await getCollectionDetail("1");

    expect(collection.books.some((book) => book.id === "5")).toBe(true);
  });

  it("removes a book from a collection", async () => {
    resetCollectionsDb([
      mockApiCollection({
        id: 1,
        books: [mockApiCatalogBook({ id: 5 })],
      }),
    ]);

    await removeBookFromCollection("1", "5");

    const collection = await getCollectionDetail("1");

    expect(collection.books).toEqual([]);
  });

  it("renames a collection", async () => {
    resetCollectionsDb([
      mockApiCollection({
        id: 1,
        name: "Old Name",
      }),
    ]);

    await renameCollection("1", "New Name");

    const collections = await getCollections();

    expect(collections[0].name).toBe("New Name");
  });
});