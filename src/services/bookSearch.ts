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

/**
 * Hits our own `/search/books/` through `apiFetch` so the search
 * route gets the same 401-refresh-and-retry handling as every
 * other first-party endpoint.
 */
export async function searchBooks(
  query: string,
  opts: { page?: number; perPage?: number } = {},
): Promise<BookSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const params = new URLSearchParams({ q: trimmed });
  if (opts.page !== undefined) params.set("page", String(opts.page));
  if (opts.perPage !== undefined) params.set("per_page", String(opts.perPage));

  const data = await apiFetch<ApiSearchResponse>(
    `/search/books/?${params.toString()}`,
  );

  return data.results.map(mapApiSearchResult);
}
