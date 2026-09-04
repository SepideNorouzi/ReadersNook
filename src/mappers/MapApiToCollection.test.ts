import { describe, it, expect } from "vitest";

import {
  mapApiCollectionDetailToCollectionWithBooks,
  mapCollectionToCreatePayload,
  mapCollectionToUpdatePayload,
} from "./MapApiToCollection";

import { mockApiCollection, mockApiBook } from "../test/fixtures";

describe("mapApiCollectionDetailToCollectionWithBooks", () => {
  it("normalizes an empty description to undefined", () => {
    const result = mapApiCollectionDetailToCollectionWithBooks(
      mockApiCollection({ description: "" }),
    );

    expect(result.description).toBeUndefined();
  });

  it("maps nested books through the book mapper", () => {
    const result = mapApiCollectionDetailToCollectionWithBooks(
      mockApiCollection({
        books: [mockApiBook({ id: 7, title: "The Hobbit" })],
      }),
    );

    expect(result.books).toHaveLength(1);
    expect(result.books[0].id).toBe("7");
    expect(result.books[0].title).toBe("The Hobbit");
  });
});

describe("mapCollectionToCreatePayload", () => {
  it("defaults a missing description to an empty string", () => {
    const payload = mapCollectionToCreatePayload("Cozy Fantasy");

    expect(payload.description).toBe("");
  });
});

describe("mapCollectionToUpdatePayload", () => {
  it("only includes fields that were actually changed", () => {
    const payload = mapCollectionToUpdatePayload({
      name: "Renamed",
    });

    expect(payload).toEqual({ name: "Renamed" });
    expect(payload.description).toBeUndefined();
  });
});