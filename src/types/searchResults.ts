/**
 * Normalized search hit from `GET /search/books/`.
 * `inLibrary` is resolved by the backend for the current user.
 */
export type BookSearchResult = {
  externalId: string;
  title: string;
  author: string;
  summary: string;
  coverUrl: string | null;
  totalPages: number;
  inLibrary: boolean;
};
