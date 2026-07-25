import { quotes } from "../../../data/quotes";
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
      icon: worm,
      unlocked: readBooks >= 2,
    },

    {
      id: "book-dragon",
      title: "Book Dragon",
      description: "Read 25 books.",
      icon: dragon,
      unlocked: readBooks >= 3,
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
      unlocked: readBooks >= 3,
    },

    // --------------------------------------------------
    // Quotes
    // --------------------------------------------------

    {
      id: "quote-collector",
      title: "Quote Collector",
      description: "Save 3 favorite quotes.",
      icon: pen,
      unlocked: quotesCount >= 3,
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
