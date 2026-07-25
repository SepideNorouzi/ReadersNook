import { quotes } from "../../../data/quotes";
import type { Achievement } from "../../../types/achievement";
import type { Book } from "../../../types/book";

export function getAchievements(books: Book[]): Achievement[] {
  const readBooks = books.filter((book) => book.status === "read").length;

  const tbrBooks = books.filter((book) => book.status === "tbr").length;

  // TODO
  const quotesCount = quotes.length;

  // TODO
  const collectionsCount = 0;

  // TODO
  const yearlyGoalProgress = 0;

  // TODO
  const currentBookProgress = 0;

  return [
    // --------------------------------------------------
    // Reading
    // --------------------------------------------------

    {
      id: "bookworm",
      title: "Bookworm",
      description: "Read 10 books.",
      icon: "🌸",
      unlocked: readBooks >= 10,
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
      title: "Library Legend",
      description: "Read 100 books.",
      icon: "👑",
      unlocked: readBooks >= 100,
    },

    // --------------------------------------------------
    // Quotes
    // --------------------------------------------------

    {
      id: "quote-collector",
      title: "Quote Collector",
      description: "Save 3 favorite quotes.",
      icon: "✒️",
      unlocked: quotesCount >= 3,
    },

    // --------------------------------------------------
    // TBR
    // --------------------------------------------------

    {
      id: "future-reader",
      title: "Future Reader",
      description: "Add 5 books to your TBR shelf.",
      icon: "📚",
      unlocked: tbrBooks >= 5,
    },

    {
      id: "adventure-awaits",
      title: "Adventure Awaits",
      description: "Add 20 books to your TBR shelf.",
      icon: "🧭",
      unlocked: tbrBooks >= 20,
    },

    // --------------------------------------------------
    // Yearly Goal
    // --------------------------------------------------

    {
      id: "halfway-there",
      title: "Halfway There",
      description: "Reach 50% of your yearly reading goal.",
      icon: "🎯",
      unlocked: yearlyGoalProgress >= 50,
    },

    // --------------------------------------------------
    // Current Reading
    // --------------------------------------------------

    {
      id: "first-chapters",
      title: "First Chapters",
      description: "Read 50% of your current book.",
      icon: "📖",
      unlocked: currentBookProgress >= 50,
    },

    // --------------------------------------------------
    // Collections
    // --------------------------------------------------

    {
      id: "collector",
      title: "Collector",
      description: "Create your first collection.",
      icon: "🗂️",
      unlocked: collectionsCount >= 1,
    },
  ];
}
