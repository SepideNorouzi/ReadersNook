import { BookApiError, type BookSearchResult } from "../types/searchResults";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY as string | undefined;

// ---- Raw shapes Google actually sends back. ----
// Local to this file on purpose — nothing outside this module should
// ever read `volumeInfo.*` directly.
type GoogleVolume = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
  };
};

type GoogleBooksResponse = {
  totalItems: number;
  items?: GoogleVolume[]; // absent entirely if there are 0 results
};

/**
 * Turns one raw Google volume into the app's internal shape.
 * Same output type as openLibrary.ts's mapper — that's what makes the
 * rest of the app indifferent to which provider produced the data.
 */
function mapGoogleVolumeToSearchResult(volume: GoogleVolume): BookSearchResult {
  const info = volume.volumeInfo;

  return {
    id: volume.id,
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

  const params = new URLSearchParams({
    q: trimmed,
    maxResults: "20",
  });

  // Adding a key moves you out of the shared global anonymous quota
  // and into your own per-project 1000-requests/day allowance.
  if (API_KEY) {
    params.set("key", API_KEY);
  }

  const res = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!res.ok) {
    throw new BookApiError(
      `Google Books request failed: ${res.status}`,
      res.status,
    );
  }

  const data: GoogleBooksResponse = await res.json();

  // Google omits `items` entirely when there are 0 results — not an
  // empty array. Default it so callers never have to think about this.
  return (data.items ?? []).map(mapGoogleVolumeToSearchResult);
}
