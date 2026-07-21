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
};
