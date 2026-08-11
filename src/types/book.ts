import type { Quote } from "./quote";

export type BookStatus = "current" | "tbr" | "read";

export type Book = {
  id: string;
  title: string;
  author: string;
  summary: string;
  quotes: Quote[];
  aestheticImages: string[];
  coverUrl: string;
  currentPage: number;
  totalPages: number;
  status: BookStatus;
  rating: number;

  sourceId?: string; // Open Library work key (e.g. /works/OL82563W) — used to dedupe "is this already saved"
  addedAt?: string; // ISO timestamp, set when a book is added via search
  genres?: string[]; // maps 1:1 from BookSearchResult.categories
};
