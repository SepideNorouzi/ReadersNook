import type { Book } from "../types/book";
import type { BookDetails } from "../types/bookDetails";
import type { BookSearchResult } from "../types/searchResults";

// Convert API data into my Book

export function mapSearchResultToBook(
  searchBook: BookSearchResult,
  details: BookDetails,
): Omit<Book, "id" | "addedAt"> {
  return {
    title: searchBook.title,
    author: searchBook.author,

    summary: details.description,

    quotes: [],
    aestheticImages: [],

    coverUrl: searchBook.coverUrl ?? "",

    currentPage: 0,
    totalPages: searchBook.pageCount ?? 0,

    status: "tbr",
    rating: 0,

    sourceId: searchBook.id,

    genres: details.categories,
  };
}
