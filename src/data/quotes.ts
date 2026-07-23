import type { Quote } from "../types/quote";

function createQuote({
  id,
  text,
  page,
  favorite = false,
  createdAt,
}: {
  id: string;
  text: string;
  page: number;
  favorite?: boolean;
  createdAt: string;
}): Quote {
  return {
    id,
    text,
    page,
    favorite,
    createdAt,
  };
}

export const quotes: Quote[] = [
  createQuote({
    id: "1",
    text: "Some books are mirrors, others are windows.",
    page: 91,
    favorite: true,
    createdAt: "2026-07-01",
  }),

  createQuote({
    id: "2",
    text: "The only way out is through.",
    page: 127,
    createdAt: "2026-07-02",
  }),

  createQuote({
    id: "3",
    text: "Every ending is a door to another beginning.",
    page: 215,
    favorite: true,
    createdAt: "2026-07-04",
  }),

  createQuote({
    id: "4",
    text: "Words have weight long after the page is turned.",
    page: 302,
    createdAt: "2026-07-06",
  }),

  createQuote({
    id: "5",
    text: "A room without books is like a body without a soul.",
    page: 42,
    favorite: true,
    createdAt: "2026-07-07",
  }),

  createQuote({
    id: "6",
    text: "There is no friend as loyal as a book.",
    page: 118,
    createdAt: "2026-07-09",
  }),

  createQuote({
    id: "7",
    text: "Reading is dreaming with open eyes.",
    page: 15,
    createdAt: "2026-07-10",
  }),

  createQuote({
    id: "8",
    text: "We tell ourselves stories in order to live.",
    page: 64,
    favorite: true,
    createdAt: "2026-07-12",
  }),

  createQuote({
    id: "9",
    text: "Books are a uniquely portable kind of magic.",
    page: 83,
    favorite: true,
    createdAt: "2026-07-15",
  }),

  createQuote({
    id: "10",
    text: "You can never get a cup of tea large enough or a book long enough to suit me.",
    page: 257,
    createdAt: "2026-07-18",
  }),
];
