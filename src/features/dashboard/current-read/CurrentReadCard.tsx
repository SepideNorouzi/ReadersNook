import { useState } from "react";
import { Bookmark } from "lucide-react";

import { useCurrentRead } from "../../../hooks/useCurrentRead";
import Card from "../../../components/ui/Card";
import CurrentReadProgress from "./CurrentReadProgress";
import CurrentReadDetails from "./CurrentReadDetail";
import CurrentReadEmbla from "./CurrentReadEmbla";

interface CurrentReadProps {
  className?: string;
}

export default function CurrentReadingCard({ className }: CurrentReadProps) {
  const { books, isLoading } = useCurrentRead();

  const [currentIndex, setCurrentIndex] = useState(0);

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
        min-h-0
        flex-col

        rounded-[22px]
        sm:rounded-[28px]

        border
        border-[var(--border)]

        bg-gradient-to-b
        from-white
        to-[var(--surface-hover)]

        p-3
        sm:p-4
        lg:p-6

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[var(--shadow-lg)]

        ${className ?? ""}
      `}
    >
      {/* Header */}
      <header className="mb-3 flex shrink-0 items-center justify-between lg:mb-5">
        <div className="flex items-center gap-2">
          <Bookmark size={13} className="text-[var(--brown-500)]" />
          <h3 className="font-heading text-sm font-semibold text-[var(--text)] lg:text-lg">
            <span className="lg:hidden">Reading</span>
            <span className="hidden lg:inline">Currently Reading</span>
          </h3>
        </div>

        <span
          className="
      rounded-full
      bg-[var(--stone-100)]

      px-2
      py-0.5

      text-[10px]
      font-medium
      uppercase
      tracking-[0.18em]

      text-[var(--text-secondary)]

      lg:px-2.5
      lg:py-1
      lg:text-[11px]
    "
        >
          {books.length}
        </span>
      </header>

      <CurrentReadEmbla
        books={books}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
      />

      {/* Bottom */}
      <div className="mt-auto space-y-3 pt-1 lg:space-y-2 lg:pt-2">
        <CurrentReadProgress book={currentBook} />

        <CurrentReadDetails book={currentBook} />
      </div>
    </Card>
  );
}
