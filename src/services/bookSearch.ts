// services/bookSearch.ts
import { apiFetch } from "../lib/apiClient";
import type { ApiSearchResponse, ApiSearchResult } from "../types/api/apiSearch";
import type { BookSearchResult } from "../types/searchResults";

function mapApiSearchResult(result: ApiSearchResult): BookSearchResult {
  return {
    externalId: result.external_id,
    title: result.title,
    author: result.author,
    summary: result.summary,
    coverUrl: result.cover_url || null,
    totalPages: result.total_pages,
    inLibrary: result.in_library,
  };
}

export type SearchPage = {
  results: BookSearchResult[];
  page: number;
  perPage: number;
  hasMore: boolean;
};

const DEFAULT_PER_PAGE = 10;

export async function searchBooks(
  query: string,
  opts: { page?: number; perPage?: number } = {},
): Promise<SearchPage> {
  const trimmed = query.trim();
  const page = opts.page ?? 1;
  const perPage = opts.perPage ?? DEFAULT_PER_PAGE;

  if (!trimmed) {
    return { results: [], page, perPage, hasMore: false };
  }

  const params = new URLSearchParams({
    q: trimmed,
    page: String(page),
    per_page: String(perPage),
  });

  const data = await apiFetch<ApiSearchResponse>(
    `/search/books/?${params.toString()}`,
  );

  return {
    results: data.results.map(mapApiSearchResult),
    page: data.page,
    perPage: data.per_page,
    // No total count from the backend, so infer "more pages exist"
    // from whether this page came back full.
    hasMore: data.results.length === data.per_page,
  };
}