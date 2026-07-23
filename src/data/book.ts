import type { Book } from "../types/book";
import img1 from "../assets/hero.jpg";

const createBook = ({
  id,
  title,
  author,
  summary,
  currentPage,
  totalPages,
  status,
  rating,
}: {
  id: string;
  title: string;
  author: string;
  summary: string;
  currentPage: number;
  totalPages: number;
  status: "current" | "tbr" | "read";
  rating: number;
}): Book => ({
  id,
  title,
  author,
  summary,

  coverUrl: img1,

  aestheticImages: [img1, img1, img1],

  currentPage,
  totalPages,

  status,
  rating,

  quotes: [
    {
      id: `${id}-1`,
      text: "The smallest choices shape the largest stories.",
      page: Math.floor(totalPages * 0.25),
      favorite: true,
      createdAt: "2026-07-01",
    },
    {
      id: `${id}-2`,
      text: "Every page changes the reader a little.",
      page: Math.floor(totalPages * 0.65),
      favorite: false,
      createdAt: "2026-07-05",
    },
  ],
});

export const books: Book[] = [
  createBook({
    id: "1",
    title: "Piranesi",
    author: "Susanna Clarke",
    summary:
      "A mysterious man lives in an endless house filled with statues and flooded halls while searching for the truth of his existence.",
    currentPage: 88,
    totalPages: 245,
    status: "current",
    rating: 5,
  }),

  createBook({
    id: "2",
    title: "The Midnight Library",
    author: "Matt Haig",
    summary:
      "Between life and death lies a library where every book represents another version of your life.",
    currentPage: 182,
    totalPages: 304,
    status: "current",
    rating: 4,
  }),

  createBook({
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    summary:
      "A practical guide to building good habits through small daily improvements.",
    currentPage: 0,
    totalPages: 320,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "4",
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    summary:
      "Bilbo Baggins leaves the comfort of home for an unforgettable adventure.",
    currentPage: 0,
    totalPages: 366,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "5",
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    summary: "A nostalgic story about love, loss, and growing into adulthood.",
    currentPage: 0,
    totalPages: 296,
    status: "tbr",
    rating: 4,
  }),

  createBook({
    id: "6",
    title: "The Secret History",
    author: "Donna Tartt",
    summary:
      "A murder among classics students slowly unravels into obsession and guilt.",
    currentPage: 0,
    totalPages: 559,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "7",
    title: "Dune",
    author: "Frank Herbert",
    summary:
      "Politics, prophecy and survival collide on the desert planet Arrakis.",
    currentPage: 0,
    totalPages: 688,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "8",
    title: "The Book Thief",
    author: "Markus Zusak",
    summary: "A young girl discovers the power of books during World War II.",
    currentPage: 0,
    totalPages: 552,
    status: "tbr",
    rating: 5,
  }),

  createBook({
    id: "9",
    title: "Project Hail Mary",
    author: "Andy Weir",
    summary: "A lone astronaut awakens with no memory and must save humanity.",
    currentPage: 476,
    totalPages: 496,
    status: "read",
    rating: 5,
  }),

  createBook({
    id: "10",
    title: "The Alchemist",
    author: "Paulo Coelho",
    summary:
      "A shepherd travels the world in search of treasure and discovers himself.",
    currentPage: 208,
    totalPages: 208,
    status: "read",
    rating: 4,
  }),

  createBook({
    id: "11",
    title: "Educated",
    author: "Tara Westover",
    summary:
      "A memoir about education, identity, and the courage to redefine yourself.",
    currentPage: 352,
    totalPages: 352,
    status: "read",
    rating: 5,
  }),
];
