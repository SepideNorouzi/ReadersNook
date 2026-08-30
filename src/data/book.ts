import type { Book } from "../types/book";
import img1 from "../assets/hero.jpg";
import { aestheticPhotos } from "./aesthetic";

const imagesByBookId = aestheticPhotos.reduce<Record<string, string[]>>(
  (acc, photo) => {
    acc[photo.bookId] = [...(acc[photo.bookId] ?? []), photo.imageUrl];
    return acc;
  },
  {},
);

const createBook = ({
  id,
  title,
  author,
  summary,
  coverUrl,
  currentPage,
  totalPages,
  status,
  rating,
}: {
  id: string;
  title: string;
  author: string;
  summary: string;
  coverUrl: string;
  currentPage: number;
  totalPages: number;
  status: "current" | "tbr" | "read";
  rating: number;
}): Book => ({
  id,

  title,
  author,
  summary,

  coverUrl,

  aestheticImages: imagesByBookId[id] ?? [img1],

  currentPage,
  totalPages,

  status,
  rating,

  quotes: [
    {
      id: `${id}-1`,
      bookId: id,
      text: "The smallest choices shape the largest stories.",
      page: Math.floor(totalPages * 0.25),
      favorite: true,
      createdAt: "2026-07-01",
      updatedAt: "2026-07-01",
      createdBy: "user",
    },
    {
      id: `${id}-2`,
      bookId: id,
      text: "Every page changes the reader a little.",
      page: Math.floor(totalPages * 0.65),
      favorite: false,
      createdAt: "2026-07-05",
      updatedAt: "2026-07-05",
      createdBy: "user",
    },
  ],
});

export const books: Book[] = [
  // ---------- ACOTAR — Sarah J. Maas ----------
  createBook({
    id: "1",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    summary:
      "A huntress is dragged into a treacherous faerie realm after killing a wolf in the woods, and finds her fate entangled with the immortal Fae lord who claims her as payment.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781619634442-L.jpg",
    currentPage: 432,
    totalPages: 432,
    status: "read",
    rating: 4,
  }),
  createBook({
    id: "2",
    title: "A Court of Mist and Fury",
    author: "Sarah J. Maas",
    summary:
      "Haunted by what she survived beneath the mountain, a newly transformed Fae woman is drawn into a dangerous bargain with the enigmatic High Lord of the Night Court.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781635575583-L.jpg",
    currentPage: 340,
    totalPages: 626,
    status: "current",
    rating: 5,
  }),

  // ---------- Throne of Glass — Sarah J. Maas ----------
  createBook({
    id: "3",
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    summary:
      "A legendary assassin is pulled from a labor camp to compete for her freedom as the king's champion, only to find someone is hunting the other competitors.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781619630345-L.jpg",
    currentPage: 0,
    totalPages: 404,
    status: "tbr",
    rating: 4,
  }),
  createBook({
    id: "4",
    title: "Crown of Midnight",
    author: "Sarah J. Maas",
    summary:
      "Now serving as the king's reluctant champion, an assassin secretly works against the crown while a deadly conspiracy closes in around everyone she loves.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781619630628-L.jpg",
    currentPage: 418,
    totalPages: 418,
    status: "read",
    rating: 5,
  }),

  // ---------- Harry Potter — J.K. Rowling ----------
  createBook({
    id: "5",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    summary:
      "An orphaned boy discovers on his eleventh birthday that he's a wizard, and is whisked off to a magical school where an old mystery awaits him.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    currentPage: 150,
    totalPages: 309,
    status: "current",
    rating: 5,
  }),
  createBook({
    id: "6",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    summary:
      "A hidden chamber and a mysterious voice in the walls threaten Hogwarts as a young wizard uncovers a decades-old secret tied to the school's founding.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg",
    currentPage: 0,
    totalPages: 341,
    status: "tbr",
    rating: 4,
  }),
];
