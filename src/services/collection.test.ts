import { describe, it, expect, beforeEach } from "vitest";
import { resetCollectionsDb } from "../data/handlers";
import {
  getCollectionsWithBooks,
  createCollection,
  renameCollection,
  addBookToCollection,
  removeBookFromCollection,
} from "./collection";
import { mockApiCollection, mockApiBook } from "../test/fixtures";

beforeEach(() => resetCollectionsDb());

describe("collection service", () => {
  it("creates a collection and returns it hydrated", async () => {
    const created = await createCollection("Cozy Fantasy");
    expect(created.name).toBe("Cozy Fantasy");
    expect(created.books).toEqual([]);
  });

  it("adds a book to a collection", async () => {
    resetCollectionsDb([mockApiCollection({ id: 1, books: [] })]);

    const updated = await addBookToCollection("1", "5");
    expect(updated.books.some((b) => b.id === "5")).toBe(true);
  });

  it("removes a book from a collection", async () => {
    resetCollectionsDb([
      mockApiCollection({ id: 1, books: [mockApiBook({ id: 5 })] }),
    ]);

    const updated = await removeBookFromCollection("1", "5");
    expect(updated.books).toEqual([]);
  });

  it("renames a collection", async () => {
    resetCollectionsDb([mockApiCollection({ id: 1, name: "Old Name" })]);

    const updated = await renameCollection("1", "New Name");
    expect(updated.name).toBe("New Name");
  });

  it("fetches all collections with books nested", async () => {
    resetCollectionsDb([
      mockApiCollection({ id: 1 }),
      mockApiCollection({ id: 2 }),
    ]);

    const all = await getCollectionsWithBooks();
    expect(all).toHaveLength(2);
  });
});
