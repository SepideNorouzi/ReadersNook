import { collections } from "../../../data/collection";
import type { Achievement } from "../../../types/achievement";
import type { Book } from "../../../types/book";

import book from "../../../assets/badge/book.svg";
import bookss from "../../../assets/badge/books.svg";
import bookShelf from "../../../assets/badge/book-shelf.svg";
import compass from "../../../assets/badge/compass.svg";
import crown from "../../../assets/badge/crown.svg";
import dragon from "../../../assets/badge/dragon.svg";
import library from "../../../assets/badge/library.svg";
import pen from "../../../assets/badge/pen.svg";
import target from "../../../assets/badge/target.svg";
import worm from "../../../assets/badge/worm.svg";

/** Keep in sync with useReadingGoal yearly goal. */
const YEARLY_GOAL = 10;

export function getAchievements(books: Book[]): Achievement[] {
  const readBooks = books.filter((b) => b.status === "read").length;
  const tbrBooks = books.filter((b) => b.status === "tbr").length;

  const favoriteQuotesCount = books.reduce(
    (count, b) => count + b.quotes.filter((q) => q.favorite).length,
    0,
  );

  const collectionsCount = collections.length;

  const yearlyGoalProgress = Math.min((readBooks / YEARLY_GOAL) * 100, 100);

  const currentBooks = books.filter((b) => b.status === "current");
  const currentBookProgress =
    currentBooks.length === 0
      ? 0
      : Math.max(
          ...currentBooks.map((b) =>
            b.totalPages > 0 ? (b.currentPage / b.totalPages) * 100 : 0,
          ),
        );

  return [
    // --------------------------------------------------
    // Reading
    // --------------------------------------------------
    {
      id: "bookworm",
      title: "Bookworm",
      description: "Read 10 books.",
      icon: worm,
      unlocked: readBooks >= 10,
    },
    {
      id: "book-dragon",
      title: "Book Dragon",
      description: "Read 25 books.",
      icon: dragon,
      unlocked: readBooks >= 25,
    },
    {
      id: "library",
      title: "Mini Library",
      description: "Read 50 books.",
      icon: library,
      unlocked: readBooks >= 50,
    },
    {
      id: "legend",
      title: "Library Legend",
      description: "Read 100 books.",
      icon: crown,
      unlocked: readBooks >= 100,
    },

    // --------------------------------------------------
    // Quotes
    // --------------------------------------------------
    {
      id: "quote-collector",
      title: "Quote Collector",
      description: "Save 3 favorite quotes.",
      icon: pen,
      unlocked: favoriteQuotesCount >= 3,
    },

    // --------------------------------------------------
    // TBR
    // --------------------------------------------------
    {
      id: "future-reader",
      title: "Future Reader",
      description: "Add 5 books to your TBR shelf.",
      icon: bookss,
      unlocked: tbrBooks >= 5,
    },
    {
      id: "adventure-awaits",
      title: "Adventure Awaits",
      description: "Add 20 books to your TBR shelf.",
      icon: compass,
      unlocked: tbrBooks >= 20,
    },

    // --------------------------------------------------
    // Yearly Goal
    // --------------------------------------------------
    {
      id: "halfway-there",
      title: "Halfway There",
      description: "Reach 50% of your yearly reading goal.",
      icon: target,
      unlocked: yearlyGoalProgress >= 50,
    },

    // --------------------------------------------------
    // Current Reading
    // --------------------------------------------------
    {
      id: "first-chapters",
      title: "First Chapters",
      description: "Read 50% of your current book.",
      icon: book,
      unlocked: currentBookProgress >= 50,
    },

    // --------------------------------------------------
    // Collections
    // --------------------------------------------------
    {
      id: "collector",
      title: "Collector",
      description: "Create your first collection.",
      icon: bookShelf,
      unlocked: collectionsCount >= 1,
    },
  ];
}
