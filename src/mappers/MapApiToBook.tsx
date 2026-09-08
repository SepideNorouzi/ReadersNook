import type { Book } from "../types/book";
import type {
  ApiLibraryEntry,
  ApiLibraryEntryDetail,
  ApiBookCreatePayload,
  ApiLibraryUpdatePayload,
  ApiCatalogBook,
} from "../types/api/apiBook";
import { mapApiQuoteNestedToQuote } from "./MapApiToQuote";
import { mapApiAestheticPhoto } from "./MapApiToAestheticPhoto";

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
    rating: entry.rating ?? 0,
    addedAt: entry.added_at,
    quotes: [],
    aestheticImages: [],
    genres: [],
    sourceId: entry.book.external_id,
  };
}

export function mapApiLibraryEntryDetailToBook(
  entry: ApiLibraryEntryDetail,
): Book {
  const photos = entry.aesthetic_photos
    ? [...entry.aesthetic_photos].sort((a, b) => a.order - b.order)
    : [];

  return {
    ...mapApiLibraryEntryToBook(entry),
    quotes: entry.quotes ? entry.quotes.map(mapApiQuoteNestedToQuote) : [],
    aestheticImages: photos.map(
      (photo) => mapApiAestheticPhoto(photo).imageUrl,
    ),
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

// Unchanged in substance — this one was already correct, since
// the create payload genuinely is flat.
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
  };
}

// Narrowed to the three fields the backend will actually accept.
export function mapBookToUpdatePayload(
  changes: Partial<Pick<Book, "status" | "currentPage" | "rating">>,
): ApiLibraryUpdatePayload {
  return {
    ...(changes.status !== undefined && {
      status: changes.status,
    }),

    ...(changes.currentPage !== undefined && {
      current_page: changes.currentPage,
    }),

    ...(changes.rating !== undefined && {
      rating: changes.rating,
    }),
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
    rating: 0,
    quotes: [],
    aestheticImages: [],
    genres: [],
    sourceId: book.external_id,
  };
}
