import { BookApiError, type BookSearchResult } from "../types/searchResults";

const BASE_URL = "https://openlibrary.org/search.json";

// Only request the fields we actually use. the default response includes large per-book
// lists (editions, ISBNs, etc.) that balloon payload size for no benefit
// here. Notably no `subject` field: subject arrays can be huge, and we
// don't currently show categories, so we don't pay for what we don't use.
const FIELDS = [
  "key",
  "title",
  "author_name",
  "cover_i",
  "first_publish_year",
  "number_of_pages_median",
  "ratings_average",
].join(",");

// ---- Raw shapes Open Library actually sends back. ----
// Local to this file on purpose — nothing outside this module should
// ever read `doc.author_name` or `doc.cover_i` directly.
type OpenLibraryDoc = {
  key: string; // e.g. "/works/OL45804W"
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  number_of_pages_median?: number;
  ratings_average?: number;
};

type OpenLibrarySearchResponse = {
  numFound: number;
  docs: OpenLibraryDoc[];
};

/**
 * Turns one raw Open Library doc into the app's internal shape.
 * Same output type as googleBooks.ts's mapper — that's what makes the
 * rest of the app indifferent to which provider produced the data.
 */
function mapOpenLibraryDocToSearchResult(
  doc: OpenLibraryDoc,
): BookSearchResult {
  return {
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.join(", ") ?? "Unknown author",
    // Covers are a separate service, keyed by cover_i, not an inline URL.
    // "-M" requests the medium size; "-S" and "-L" also exist.
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    description: "", // search.json doesn't return descriptions; detail lookup would
    publishedDate: doc.first_publish_year?.toString(),
    pageCount: doc.number_of_pages_median,
    categories: [], // deliberately not requested
    averageRating: doc.ratings_average,
  };
}

/**
 * Hits Open Library's public search endpoint and returns normalized
 * results. No API key, no account — the endpoint is open by design.
 */
export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const params = new URLSearchParams({
    q: trimmed,
    fields: FIELDS,
    limit: "20",
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!res.ok) {
    throw new BookApiError(
      `Open Library request failed: ${res.status}`,
      res.status,
    );
  }

  const data: OpenLibrarySearchResponse = await res.json();

  return data.docs.map(mapOpenLibraryDocToSearchResult);
}
