import type { Achievement } from "../../../types/achievement";
import type { Book } from "../../../types/book";

export function getAchievements(books: Book[]): Achievement[] {
  const readBooks = books.filter((book) => book.status === "read").length;

  return [
    {
      id: "bookworm",
      title: "Bookworm",
      description: "Read 10 books.",
      icon: "🌸",
      unlocked: readBooks >= 2,
    },

    {
      id: "book-dragon",
      title: "Book Dragon",
      description: "Read 25 books.",
      icon: "🐉",
      unlocked: readBooks >= 25,
    },

    {
      id: "library",
      title: "Mini Library",
      description: "Read 50 books.",
      icon: "🏛️",
      unlocked: readBooks >= 50,
    },

    {
      id: "legend",
      title: "Legend",
      description: "Read 100 books.",
      icon: "👑",
      unlocked: readBooks >= 100,
    },
  ];
}
