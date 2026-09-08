import type { ApiLibraryEntry } from "../types/api/apiBook";
import type { ApiCollectionDetail } from "../types/api/apiCollection";

export function mockApiBook(
  overrides: Partial<ApiLibraryEntry> = {},
): ApiLibraryEntry {
  return {
    id: 1,
    book: {
      id: 10,
      external_id: "/works/OL123W",
      title: "Piranesi",
      author: "Susanna Clarke",
      summary: "A man lives in a house of infinite rooms.",
      cover_url: "",
      total_pages: 245,
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    },
    status: "tbr",
    current_page: 0,
    rating: null,
    added_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

export function mockApiCollection(
  overrides: Partial<ApiCollectionDetail> = {},
): ApiCollectionDetail {
  return {
    id: 1,
    name: "Cozy Fantasy",
    description: "",
    books: [],
    created_by: 1,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}