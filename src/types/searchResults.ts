/**
 * Normalized search hit from `GET /search/books/`.
 * `inLibrary` is resolved by the backend for the current user.
 * `databaseId` is null until the book has been ingested into the
 * shared catalog. When present it is copied onto `Book.catalogId`
 * for unsaved previews; library membership still uses `externalId`.
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