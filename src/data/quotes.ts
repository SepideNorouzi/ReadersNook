import type { Quote } from "../types/quote";

function createQuote({
  id,
  bookId,
  text,
  page,
  favorite = false,
  createdAt,
  updatedAt,
}: {
  id: string;
  bookId: string;
  text: string;
  page: number;
  favorite?: boolean;
  createdAt: string;
  updatedAt?: string;
}): Quote {
  return {
    id,
    bookId,
    text,
    page,
    favorite,
    createdAt,
    updatedAt: updatedAt ?? createdAt,
  };
}

export const quotes: Quote[] = [
  createQuote({
    id: "1",
    bookId: "1",
    text: "Some books are mirrors, others are windows.",
    page: 91,
    favorite: true,
    createdAt: "2026-07-01",
  }),

  createQuote({
    id: "2",
    bookId: "1",
    text: "The only way out is through.",
    page: 127,
    createdAt: "2026-07-02",
  }),

  createQuote({
    id: "3",
    bookId: "2",
    text: "Every ending is a door to another beginning.",
    page: 215,
    favorite: true,
    createdAt: "2026-07-04",
  }),

  createQuote({
    id: "4",
    bookId: "2",
    text: "Words have weight long after the page is turned.",
    page: 302,
    createdAt: "2026-07-06",
  }),

  createQuote({
    id: "5",
    bookId: "3",
    text: "A room without books is like a body without a soul.",
    page: 42,
    favorite: true,
    createdAt: "2026-07-07",
  }),

  createQuote({
    id: "6",
    bookId: "3",
    text: "There is no friend as loyal as a book.",
    page: 118,
    createdAt: "2026-07-09",
  }),

  createQuote({
    id: "7",
    bookId: "4",
    text: "Reading is dreaming with open eyes.",
    page: 15,
    createdAt: "2026-07-10",
  }),

  createQuote({
    id: "8",
    bookId: "4",
    text: "We tell ourselves stories in order to live.",
    page: 64,
    favorite: true,
    createdAt: "2026-07-12",
  }),

  createQuote({
    id: "9",
    bookId: "5",
    text: "Books are a uniquely portable kind of magic.",
    page: 83,
    favorite: true,
    createdAt: "2026-07-15",
  }),

  createQuote({
    id: "10",
    bookId: "5",
    text: "You can never get a cup of tea large enough or a book long enough to suit me.",
    page: 257,
    createdAt: "2026-07-18",
  }),
];
