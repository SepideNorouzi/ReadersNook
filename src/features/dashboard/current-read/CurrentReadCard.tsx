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
        flex-col

        rounded-[28px]

        border
        border-[var(--border)]

        bg-gradient-to-b
        from-white
        to-[var(--surface-hover)]

        p-4
        sm:p-5
        lg:p-6

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[var(--shadow-lg)]

        ${className ?? ""}
      `}
    >
      {/* Header */}
      <header className="mb-3 flex items-center justify-between lg:mb-5">
        <div className="flex items-center gap-2">
          <Bookmark size={13} className="text-[var(--brown-500)]" />
          {/* desktop */}
          <h3 className="hidden lg:block font-heading text-[12px] font-semibold text-[var(--text)] lg:text-lg">
            Currently Reading
          </h3>
          {/* mobile */}
          <h3 className="block lg:hidden font-heading text-[12px] font-semibold text-[var(--text)] lg:text-lg">
            Reading
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
      <div className="mt-auto space-y-2 pt-2">
        <CurrentReadProgress book={currentBook} />

        <CurrentReadDetails book={currentBook} />
      </div>
    </Card>
  );
}
