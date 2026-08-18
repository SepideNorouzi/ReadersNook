import { useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark, BookMarked } from "lucide-react";

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
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  const hasBooks = books.length > 0;
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

        {/*only show the count once there's one worth showing */}
        {hasBooks && (
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
        )}
      </header>

      {hasBooks ? (
        <>
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
        </>
      ) : (
        /* Empty state */
        <div
          className="
            flex
            flex-1
            flex-col
            items-center
            justify-center
            gap-3

            py-4

            text-center
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full
              bg-[var(--stone-100)]

              text-[var(--brown-500)]

              lg:h-14
              lg:w-14
            "
          >
            <BookMarked size={18} className="lg:hidden" />
            <BookMarked size={22} className="hidden lg:block" />
          </div>

          <div className="space-y-1">
            <p className="font-heading text-sm font-semibold text-[var(--text)] lg:text-base">
              Nothing in progress
            </p>
            <p className="mx-auto max-w-[200px] text-xs text-[var(--text-secondary)] lg:text-sm">
              Add a book and mark it as current to see it here.
            </p>
          </div>

          <button
            onClick={() => navigate("/search")}
            className="
              mt-1

              rounded-full
              border
              border-[var(--border)]
              bg-white

              px-4
              py-1.5

              text-xs
              font-medium
              text-[var(--text)]

              transition-all
              hover:border-[var(--brown-500)]
              hover:bg-[var(--stone-100)]

              lg:text-sm
            "
          >
            Find a book
          </button>
        </div>
      )}
    </Card>
  );
}
