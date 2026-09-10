import type { Book } from "../../types/book";
import type { BookSearchResult } from "../../types/searchResults";

export function mapSearchResultToBook(
  result: BookSearchResult,
): Omit<Book, "id" | "addedAt"> {
  return {
    title: result.title,
    author: result.author,
    summary: result.summary?.trim() || "No summary available yet.",
    coverUrl: result.coverUrl ?? "",
    totalPages: result.totalPages,
    currentPage: 0,
    status: "tbr",
    rating: 0,
    quotes: [],
    aestheticImages: [],
    genres: [],
    sourceId: result.externalId,
  };
}
