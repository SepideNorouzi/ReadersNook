// ---- The NORMALIZED shape your app actually works with. ----
// This is what components, hooks, everything downstream sees, regardless
// of which book API is behind it. Catalog data only — no `status`, no
// personal `rating`, no `currentPage`. Those get added later, at the
// moment the user clicks "Add to Library."
export type BookSearchResult = {
  id: string;
  title: string;
  author: string; // joined authors, always a string, never undefined
  coverUrl: string | null; // explicit null > undefined, forces handling "no cover"
  description: string; // falls back to "" if the source sends none
  publishedDate?: string;
  pageCount?: number;
  categories: string[]; // falls back to [] instead of undefined
  averageRating?: number; // the SOURCE's community rating — NOT your Book.rating (personal)
};

/**
 * A typed error any book-search service can throw, so callers (like
 * useSearchBooks) can check *why* a request failed without parsing
 * message strings or caring which provider is behind the call.
 * A 429 here means "rate limited," not "something is broken."
 */
export class BookApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BookApiError";
    this.status = status;
  }
}
