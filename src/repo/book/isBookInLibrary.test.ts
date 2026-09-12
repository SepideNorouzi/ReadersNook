import { expect, it } from "vitest";

import type { Book } from "../../types/book";
import { isBookInLibrary } from "./isBookInLibrary";

const piranesi = {
  id: "1",
  title: "Piranesi",
  author: "Susanna Clarke",
  sourceId: "hardcover:123",
} as Book;

it("returns false for an empty library", () => {
  expect(isBookInLibrary([], "hardcover:123")).toBe(false);
  expect(isBookInLibrary(undefined, "hardcover:123")).toBe(false);
});

it("matches by sourceId when the library entry has one", () => {
  expect(isBookInLibrary([piranesi], "hardcover:123")).toBe(true);
  expect(isBookInLibrary([piranesi], "hardcover:999")).toBe(false);
});

it("matches by title and author when sourceId is missing on the stored book", () => {
  const seeded = { ...piranesi, sourceId: undefined };

  expect(
    isBookInLibrary([seeded], "hardcover:123", {
      title: "Piranesi",
      author: "Susanna Clarke",
    }),
  ).toBe(true);

  expect(
    isBookInLibrary([seeded], "hardcover:123", {
      title: "Piranesi",
      author: "Someone Else",
    }),
  ).toBe(false);
});
