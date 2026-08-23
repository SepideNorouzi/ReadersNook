import type { ApiBookSummary } from "../types/api/apiBook";
import type { ApiCollectionSummary } from "../types/api/apiCollection";
// a factory for fake data

export function mockApiBook(
  overrides: Partial<ApiBookSummary> = {},
): ApiBookSummary {
  // The overrides at the end replaces the defaults.
  return {
    id: 1,
    title: "Piranesi",
    author: "Susanna Clarke",
    summary: "A man lives in a house of infinite rooms.",
    cover_url: "",
    current_page: 0,
    total_pages: 245,
    status: "tbr",
    rating: 0,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

export function mockApiCollection(
  overrides: Partial<ApiCollectionSummary> = {},
): ApiCollectionSummary {
  return {
    id: 1,
    name: "Cozy Fantasy",
    description: "",
    books: [],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}
