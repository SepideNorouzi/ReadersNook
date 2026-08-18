import type { Book } from "../types/book";
import type { ApiBook, ApiBookPayload } from "../types/api/apiBook";

/** Django Book -> app-internal Book. */
export function mapApiBookToBook(apiBook: ApiBook): Book {
  return {
    id: String(apiBook.id), // number -> string at the boundary
    title: apiBook.title,
    author: apiBook.author,
    summary: apiBook.summary,
    coverUrl: apiBook.cover_url,
    currentPage: apiBook.current_page,
    totalPages: apiBook.total_pages,
    status: apiBook.status,
    rating: apiBook.rating,
    addedAt: apiBook.created_at,

    // Not modeled on the backend yet — safe defaults so nothing
    // downstream has to guard against undefined arrays.
    quotes: [],
    aestheticImages: [],
    genres: [],
    sourceId: undefined,
  };
}

/** App-internal Book -> the payload POST/PUT/PATCH expect. */
export function mapBookToApiPayload(
  book: Partial<Book>,
): Partial<ApiBookPayload> {
  const payload: Partial<ApiBookPayload> = {};

  if (book.title !== undefined) payload.title = book.title;
  if (book.author !== undefined) payload.author = book.author;
  if (book.summary !== undefined) payload.summary = book.summary;
  if (book.coverUrl !== undefined) payload.cover_url = book.coverUrl;
  if (book.currentPage !== undefined) payload.current_page = book.currentPage;
  if (book.totalPages !== undefined) payload.total_pages = book.totalPages;
  if (book.status !== undefined) payload.status = book.status;
  if (book.rating !== undefined) payload.rating = book.rating;

  // quotes/aestheticImages/genres/sourceId intentionally omitted —
  // the backend has no columns for them, so sending them does nothing useful.

  return payload;
}
