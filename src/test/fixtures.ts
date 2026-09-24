import type { ApiCatalogBook, ApiLibraryEntry } from "../types/api/apiBook";

import type { ApiCollectionDetail } from "../types/api/apiCollection";
import type { AuthUser, Profile } from "../auth/types/auth";

export function mockApiCatalogBook(
  overrides: Partial<ApiCatalogBook> = {},
): ApiCatalogBook {
  return {
    id: 10,
    external_id: "hardcover:123",
    title: "Piranesi",
    author: "Susanna Clarke",
    summary: "A man lives in a house of infinite rooms.",
    cover_url: "",
    total_pages: 245,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    genres: ["fantasy,literary"],
    rating: 0,
    ...overrides,
  };
}

export function mockApiBook(
  overrides: Partial<ApiLibraryEntry> = {},
): ApiLibraryEntry {
  return {
    id: 1,
    book: mockApiCatalogBook(),
    status: "tbr",
    current_page: 0,
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

export function mockAuthUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: 1,
    first_name: "Sepide",
    last_name: "Norouzi",
    username: "sepide",
    avatar: null, // an avatar *id* or null, never a path
    ...overrides,
  };
}

export function mockProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "1", // Profile.id is now String(AuthUser.id)
    name: "Sepide Norouzi",
    username: "sepide",
    avatarUrl: null,
    ...overrides,
  };
}
