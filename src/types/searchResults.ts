/**
 * Normalized search hit from `GET /search/books/`.
 * `inLibrary` is resolved by the backend for the current user.
 * `databaseId` is null until the book has been ingested into the
 * shared catalog by anyone's search — once non-null, book detail
 * should be fetched via getBookByDatabaseId instead of
 * getBookByExternalId.
 */
export type BookSearchResult = {
  externalId: string;
  title: string;
  author: string;
  summary: string;
  coverUrl: string | null;
  totalPages: number;
  inLibrary: boolean;
  databaseId: number | null;
  genres: string[];
  rating: number;
};