import type { Book } from "../../types/book";
import type { BookDetails } from "../../types/bookDetails";
import type { BookSearchResult } from "../../types/searchResults";

const FALLBACK_COVER = "https://via.placeholder.com/128x192?text=No+Cover";

export function mapSearchResultToBook(
  result: BookSearchResult,
  details?: BookDetails,
): Omit<Book, "id" | "addedAt"> {
  const summary =
    details?.description?.trim() ||
    result.description?.trim() ||
    "No summary available yet.";

  const genres =
    details?.categories?.length
      ? details.categories
      : (result.categories ?? []);

  return {
    title: result.title,
    author: result.author,
    summary,
    coverUrl: result.coverUrl ?? FALLBACK_COVER,
    aestheticImages: [],
    currentPage: 0,
    totalPages: result.pageCount ?? 0,
    status: "tbr",
    rating: 0,
    quotes: [],
    sourceId: result.id,
    genres,
  };
}
