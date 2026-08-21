import type { Book } from "../types/book";
import type {
  ApiBookSummary,
  ApiBookDetail,
  ApiBookCreatePayload,
  ApiBookUpdatePayload,
} from "../types/api/apiBook";
import { mapApiQuoteNestedToQuote } from "./MapApiToQuote";
import { mapApiAestheticPhoto } from "./MapApiToAestheticPhoto";

export function mapApiBookSummaryToBook(apiBook: ApiBookSummary): Book {
  return {
    id: String(apiBook.id),
    title: apiBook.title,
    author: apiBook.author,
    summary: apiBook.summary,
    coverUrl: apiBook.cover_url,
    currentPage: apiBook.current_page,
    totalPages: apiBook.total_pages,
    status: apiBook.status,
    rating: apiBook.rating ?? 0,
    addedAt: apiBook.created_at,
    quotes: [],
    aestheticImages: [],
    genres: [],
    sourceId: undefined,
  };
}

export function mapApiBookDetailToBook(apiBook: ApiBookDetail): Book {
  const photos = [...apiBook.aesthetic_photos].sort((a, b) => a.order - b.order);

  return {
    ...mapApiBookSummaryToBook(apiBook),
    quotes: apiBook.quotes.map(mapApiQuoteNestedToQuote),
    aestheticImages: photos.map((photo) => mapApiAestheticPhoto(photo).imageUrl),
  };
}

export function mapBookToCreatePayload(
  book: Omit<Book, "id" | "addedAt">,
): ApiBookCreatePayload {
  return {
    title: book.title,
    author: book.author,
    summary: book.summary,
    cover_url: book.coverUrl,
    total_pages: book.totalPages,
  };
}

export function mapBookToUpdatePayload(
  changes: Partial<Book>,
): Partial<ApiBookUpdatePayload> {
  const payload: Partial<ApiBookUpdatePayload> = {};
  if (changes.title !== undefined) payload.title = changes.title;
  if (changes.author !== undefined) payload.author = changes.author;
  if (changes.summary !== undefined) payload.summary = changes.summary;
  if (changes.coverUrl !== undefined) payload.cover_url = changes.coverUrl;
  if (changes.currentPage !== undefined)
    payload.current_page = changes.currentPage;
  if (changes.totalPages !== undefined)
    payload.total_pages = changes.totalPages;
  if (changes.status !== undefined) payload.status = changes.status;
  if (changes.rating !== undefined) payload.rating = changes.rating;
  return payload;
}
