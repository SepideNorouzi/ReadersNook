import { describe, expect, it } from "vitest";

import {
  mapApiCatalogBookToBook,
  mapApiSearchResult,
  mapSearchResultToBook,
} from "./MapApiToBook";
import { mockApiCatalogBook } from "../test/fixtures";
import type { ApiSearchResult } from "../types/api/apiSearch";

function mockApiSearchResult(
  overrides: Partial<ApiSearchResult> = {},
): ApiSearchResult {
  return {
    external_id: "hardcover:123",
    title: "Piranesi",
    author: "Susanna Clarke",
    summary: "A man lives in a house of infinite rooms.",
    cover_url: "",
    total_pages: 245,
    genres: ["fantasy", "literary"],
    rating: 4.6,
    in_library: false,
    database_id: 10,
    ...overrides,
  };
}

describe("mapApiSearchResult", () => {
  it("normalizes empty covers and missing catalog ids", () => {
    const result = mapApiSearchResult(
      mockApiSearchResult({ cover_url: "", database_id: null }),
    );

    expect(result.coverUrl).toBeNull();
    expect(result.databaseId).toBeNull();
    expect(result.genres).toEqual(["fantasy", "literary"]);
  });
});

describe("mapSearchResultToBook", () => {
  it("keeps catalog identity but does not copy catalog rating", () => {
    const book = mapSearchResultToBook(
      mapApiSearchResult(mockApiSearchResult()),
    );

    expect(book.sourceId).toBe("hardcover:123");
    expect(book.catalogId).toBe("10");
    expect(book.rating).toBe(0);
    expect(book.status).toBe("tbr");
    expect(book.currentPage).toBe(0);
    expect(book.coverUrl).toBe("");
  });
});

describe("mapApiCatalogBookToBook", () => {
  it("uses the same unsaved-library defaults as search", () => {
    const fromCatalog = mapApiCatalogBookToBook(mockApiCatalogBook());
    const fromSearch = mapSearchResultToBook(
      mapApiSearchResult(mockApiSearchResult({ rating: 4.6 })),
    );

    expect(fromCatalog.status).toBe(fromSearch.status);
    expect(fromCatalog.currentPage).toBe(fromSearch.currentPage);
    expect(fromCatalog.quotes).toEqual([]);
    expect(fromCatalog.aestheticImages).toEqual([]);
  });
});
