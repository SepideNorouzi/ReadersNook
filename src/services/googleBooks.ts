import type {
  GoogleBooksResponse,
  GoogleVolume,
  BookSearchResult,
} from "../types/searchResults";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/**
 * Turns one raw Google volume into the app's internal shape.
 * This is the ONLY place that should ever read `volumeInfo.*`.
 * Everything past this function deals in clean BookSearchResult objects.
 */
function mapGoogleVolumeToSearchResult(volume: GoogleVolume): BookSearchResult {
  const info = volume.volumeInfo;

  return {
    googleId: volume.id,
    title: info.title,
    author: info.authors?.join(", ") ?? "Unknown author",
    coverUrl:
      info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail ?? null,
    description: info.description ?? "",
    publishedDate: info.publishedDate,
    pageCount: info.pageCount,
    categories: info.categories ?? [],
    averageRating: info.averageRating,
  };
}

/**
 * Hits Google's public volumes endpoint and returns normalized results.
 * Returns [] for an empty query instead of firing a pointless request
 * for "all books ever".
 */
export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const url = `${BASE_URL}?q=${encodeURIComponent(trimmed)}&maxResults=20`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Google Books request failed: ${res.status}`);
  }

  const data: GoogleBooksResponse = await res.json();

  // Google omits `items` entirely when there are 0 results — not an
  // empty array. Default it so callers never have to think about this.
  return (data.items ?? []).map(mapGoogleVolumeToSearchResult);
}
