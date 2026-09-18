import type { Book } from "../types/book";
import type {
  ApiLibraryEntry,
  ApiCatalogBookDetail,
  ApiBookCreatePayload,
  ApiCatalogBook,
} from "../types/api/apiBook";
import type { ApiSearchResult } from "../types/api/apiSearch";
import type { BookSearchResult } from "../types/searchResults";
import { mapApiQuoteNestedToQuote } from "./MapApiToQuote";
import { mapApiAestheticPhoto } from "./MapApiToAestheticPhoto";

// ASSUMPTION: comma-separated. Confirm the real delimiter with
// [[backend-teammate]] — nothing in the given Swagger docs states how
// the nested `book.genres` string is joined server-side.
function parseGenres(genres: string | string[] | undefined): string[] {
  if (Array.isArray(genres)) {
    return genres.filter(Boolean);
  }

  return genres
    ? genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
    : [];
}

function unsavedLibraryDefaults(): Pick<
  Book,
  "currentPage" | "status" | "quotes" | "aestheticImages"
> {
  return {
    currentPage: 0,
    status: "tbr",
    quotes: [],
    aestheticImages: [],
  };
}

export function mapApiLibraryEntryToBook(entry: ApiLibraryEntry): Book {
  return {
    id: String(entry.id),
    catalogId: String(entry.book.id),
    title: entry.book.title,
    author: entry.book.author,
    summary: entry.book.summary,
    coverUrl: entry.book.cover_url,
    currentPage: entry.current_page,
    totalPages: entry.book.total_pages,
    status: entry.status,
    rating: entry.book.rating,
    addedAt: entry.added_at,
    quotes: [],
    aestheticImages: [],
    genres: parseGenres(entry.book.genres),
    sourceId: entry.book.external_id,
  };
}

export type CatalogDetailLibraryEntry = Pick<Book, "id"> &
  Partial<
    Pick<Book, "catalogId" | "sourceId" | "status" | "currentPage" | "addedAt">
  >;

export function mapApiCatalogBookDetailToBook(
  entry: ApiCatalogBookDetail,
  libraryEntry?: CatalogDetailLibraryEntry,
): Book {
  const userBook = entry.user_book;

  const photos = userBook?.aesthetic_photos
    ? [...userBook.aesthetic_photos].sort((a, b) => a.order - b.order)
    : [];

  const libraryId = libraryEntry?.id;

  return {
    // GET /books/{id}/ does not guarantee user_book.id. The library-entry
    // id must come from /library/. Catalog id is display-only for unsaved
    // previews and must not be used for status/progress/delete mutations.
    id: libraryId ?? String(entry.id),
    catalogId: libraryEntry?.catalogId ?? String(entry.id),
    title: entry.title,
    author: entry.author,
    summary: entry.summary,
    coverUrl: entry.cover_url,
    currentPage: userBook?.current_page ?? libraryEntry?.currentPage ?? 0,
    totalPages: entry.total_pages,
    status: userBook?.status ?? libraryEntry?.status ?? "tbr",
    rating: entry.rating,
    addedAt: libraryId
      ? (libraryEntry?.addedAt ?? userBook?.added_at)
      : undefined,
    quotes: userBook?.quotes
      ? userBook.quotes.map(mapApiQuoteNestedToQuote)
      : [],
    aestheticImages: photos.map(
      (photo) => mapApiAestheticPhoto(photo).imageUrl,
    ),
    genres: parseGenres(entry.genres),
    sourceId: libraryEntry?.sourceId ?? entry.external_id,
  };
}

function clip(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max);
}

function toCoverUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return clip(url, 500);
    }
  } catch {
    // Invalid absolute URL — the API's URLField would 400.
  }
  return "";
}

export function mapBookToCreatePayload(
  book: Omit<Book, "id" | "addedAt">,
): ApiBookCreatePayload {
  if (!book.sourceId) {
    throw new Error("Cannot add book: missing external_id.");
  }
  const totalPages = Math.max(0, Math.round(book.totalPages || 0));
  const currentPage = Math.max(0, Math.round(book.currentPage || 0));
  return {
    external_id: book.sourceId,
    title: clip(book.title, 255),
    author: clip(book.author, 255),
    summary: book.summary,
    cover_url: toCoverUrl(book.coverUrl),
    current_page: Math.min(currentPage, totalPages),
    total_pages: totalPages,
    status: book.status || "tbr",
    rating: book.rating ?? 0,
    genres: book.genres ?? [],
  };
}

export function mapApiCatalogBookToBook(book: ApiCatalogBook): Book {
  return {
    id: String(book.id),
    catalogId: String(book.id),
    title: book.title,
    author: book.author,
    summary: book.summary,
    coverUrl: book.cover_url || "",
    totalPages: book.total_pages,
    ...unsavedLibraryDefaults(),
    rating: book.rating,
    genres: parseGenres(book.genres),
    sourceId: book.external_id,
  };
}

export function mapApiSearchResult(result: ApiSearchResult): BookSearchResult {
  return {
    externalId: result.external_id,
    title: result.title,
    author: result.author,
    summary: result.summary,
    coverUrl: result.cover_url || null,
    totalPages: result.total_pages,
    inLibrary: result.in_library,
    databaseId: result.database_id ?? null,
    genres: parseGenres(result.genres),
    rating: result.rating ?? 0,
  };
}

/**
 * Search hit → book payload for library add / unsaved detail preview.
 *
 * Catalog rating is intentionally not copied: that is a shared score,
 * not the user's personal rating for a book they just added.
 */
export function mapSearchResultToBook(
  result: BookSearchResult,
): Omit<Book, "id" | "addedAt"> {
  return {
    title: result.title,
    author: result.author,
    summary: result.summary?.trim() || "No summary available yet.",
    coverUrl: result.coverUrl ?? "",
    totalPages: result.totalPages,
    ...unsavedLibraryDefaults(),
    rating: 0,
    genres: result.genres,
    sourceId: result.externalId,
    catalogId:
      result.databaseId != null ? String(result.databaseId) : undefined,
  };
}
