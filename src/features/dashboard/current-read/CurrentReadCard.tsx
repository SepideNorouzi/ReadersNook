import { useState } from "react";
import { Bookmark } from "lucide-react";

import Card from "../../../components/ui/Card";
import { useCurrentRead } from "../../../hooks/useCurrentRead";

import CurrentReadCarousel from "./CurrentReadCarousel";
import CurrentReadNavigation from "./CurrentReadNavigation";
import CurrentReadProgress from "./CurrentReadProgress";
import CurrentReadDetails from "./CurrentReadDetail";

interface CurrentReadProps {
  className?: string;
}

export default function CurrentReadingCard({ className }: CurrentReadProps) {
  const { books, isLoading } = useCurrentRead();

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  }

  function handlePrevious() {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  }

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (books.length === 0) {
    return <Card>No current book.</Card>;
  }

  const currentBook = books[currentIndex];

  return (
    <Card
      className={`
        flex
        h-full
        flex-col

        rounded-[28px]

        bg-gradient-to-b
        from-white
        to-[var(--surface-hover)]

        border
        border-[var(--border)]

        p-6

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[var(--shadow-lg)]

        ${className ?? ""}
      `}
    >
      {/* Header */}
      <header className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Bookmark
            size={16}
            strokeWidth={2.2}
            className="text-[var(--brown-500)]"
          />

          <h3 className="font-heading text-lg font-semibold text-[var(--text)]">
            Currently Reading
          </h3>
        </div>

        <span
          className="
            rounded-full
            bg-[var(--stone-100)]
            px-2.5
            py-1

            text-[11px]
            font-medium
            uppercase
            tracking-wider

            text-[var(--text-secondary)]
          "
        >
          {books.length}
        </span>
      </header>

      {/* Book Cover */}
      <CurrentReadCarousel book={currentBook} />

      {/* Navigation */}
      <div className="mt-4">
        <CurrentReadNavigation
          total={books.length}
          currentIndex={currentIndex}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>

      {/* Push remaining content toward bottom */}
      <div className="mt-auto space-y-3 pt-1">
        <CurrentReadProgress book={currentBook} />

        <div>
          <CurrentReadDetails book={currentBook} />
        </div>
      </div>
    </Card>
  );
}
