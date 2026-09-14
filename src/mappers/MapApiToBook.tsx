import type { Book } from "../types/book";
import type {
  ApiLibraryEntry,
  ApiCatalogBookDetail,
  ApiBookCreatePayload,
  ApiCatalogBookUpdatePayload,
  ApiCatalogBook,
} from "../types/api/apiBook";
import { mapApiQuoteNestedToQuote } from "./MapApiToQuote";
import { mapApiAestheticPhoto } from "./MapApiToAestheticPhoto";

// ASSUMPTION: comma-separated. Confirm the real delimiter with
// [[backend-teammate]] — nothing in the given Swagger docs states how
// the nested `book.genres` string is joined server-side.
function parseGenres(genres: string | string[]): string[] {
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

export function mapApiCatalogBookDetailToBook(
  entry: ApiCatalogBookDetail,
): Book {
  const userBook = entry.user_book;

  const photos = userBook?.aesthetic_photos
    ? [...userBook.aesthetic_photos].sort((a, b) => a.order - b.order)
    : [];

  return {
    // Falls back to the catalog id when there's no library entry yet
    // (a not-yet-saved preview). Fine for display/keys — don't feed
    // this into deleteBook or a status update, which expect a real
    // library-entry id.
    id: userBook ? String(userBook.id) : String(entry.id),
    catalogId: String(entry.id),
    title: entry.title,
    author: entry.author,
    summary: entry.summary,
    coverUrl: entry.cover_url,
    currentPage: userBook?.current_page ?? 0,
    totalPages: entry.total_pages,
    status: userBook?.status ?? "tbr",
    rating: entry.rating,
    addedAt: userBook?.added_at,
    quotes: userBook?.quotes
      ? userBook.quotes.map(mapApiQuoteNestedToQuote)
      : [],
    aestheticImages: photos.map(
      (photo) => mapApiAestheticPhoto(photo).imageUrl,
    ),
    genres: entry.genres,
    sourceId: entry.external_id,
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

export function mapBookToCatalogUpdatePayload(
  changes: Partial<
    Pick<
      Book,
      | "title"
      | "author"
      | "genres"
      | "summary"
      | "coverUrl"
      | "totalPages"
      | "rating"
    >
  >,
): ApiCatalogBookUpdatePayload {
  return {
    ...(changes.title !== undefined && { title: clip(changes.title, 255) }),
    ...(changes.author !== undefined && { author: clip(changes.author, 255) }),
    ...(changes.genres !== undefined && { genres: changes.genres }),
    ...(changes.summary !== undefined && { summary: changes.summary }),
    ...(changes.coverUrl !== undefined && {
      cover_url: toCoverUrl(changes.coverUrl),
    }),
    ...(changes.totalPages !== undefined && {
      total_pages: changes.totalPages,
    }),
    ...(changes.rating !== undefined && { rating: changes.rating }),
  };
}

export function mapApiCatalogBookToBook(book: ApiCatalogBook): Book {
  return {
    id: String(book.id),
    catalogId: String(book.id),
    title: book.title,
    author: book.author,
    summary: book.summary,
    coverUrl: book.cover_url,
    totalPages: book.total_pages,
    currentPage: 0,
    status: "tbr",
    rating: book.rating,
    quotes: [],
    aestheticImages: [],
    genres: parseGenres(book.genres),
    sourceId: book.external_id,
  };
}
