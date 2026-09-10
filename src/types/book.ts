import type { Quote } from "./quote";

export type BookStatus = "current" | "tbr" | "read";

export type Book = {
  id: string; // library entry id
  catalogId?: string; // backend book/catalog id
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

  sourceId?: string; // catalog external_id — used to dedupe "is this already saved"
  addedAt?: string; // ISO timestamp, set when a book is added via search
  genres?: string[];
};
