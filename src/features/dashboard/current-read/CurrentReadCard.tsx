import { useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark, BookMarked } from "lucide-react";

import { useCurrentRead } from "../../../hooks/useCurrentRead";
import Card from "../../../ui/Card";
import CurrentReadProgress from "./CurrentReadProgress";
import CurrentReadDetails from "./CurrentReadDetail";
import CurrentReadEmbla from "./CurrentReadEmbla";
import Loading from "../../../shared/Loading";

interface CurrentReadProps {
  className?: string;
}

export default function CurrentReadingCard({ className }: CurrentReadProps) {
  const { books, isLoading } = useCurrentRead();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardClass = `
  relative isolate
  flex w-full min-w-0 flex-col self-start overflow-hidden
  min-h-[220px] sm:min-h-[240px] lg:min-h-[505.5px]
  rounded-[22px] sm:rounded-[28px]
  border border-[rgba(207,162,71,0.28)]
  bg-[linear-gradient(135deg,var(--brown-600)_0%,var(--brown-700)_48%,var(--brown-800)_100%)]
  p-3.5 sm:p-4 lg:p-6
  shadow-[var(--shadow-premium)]
  transition-all duration-500 ease-out
  hover:-translate-y-1.5
  hover:border-[rgba(248,237,203,0.42)]
  hover:shadow-[var(--shadow-premium-hover)]
  ${className ?? ""}
`;

  if (isLoading) {
    return (
      <Card className={cardClass}>
        <p className="text-sm text-[var(--gold-light)]">
          <Loading />
        </p>
      </Card>
    );
  }

  const hasBooks = books.length > 0;
  const currentBook = books[currentIndex];

  return (
    <Card className={cardClass}>
      {/* Premium edge shine */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-[1px] z-0 rounded-[inherit]
          border border-[rgba(248,237,203,0.07)]
          shadow-[inset_0_1px_0_rgba(248,237,203,0.14)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[8%] right-[8%] top-0 z-20 h-px
          bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent
          opacity-90 blur-[0.4px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-[10%] left-0 top-[10%] z-20 w-px
          bg-gradient-to-b from-transparent via-[var(--orange)] to-transparent
          opacity-45 blur-[0.5px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-[10%] right-0 top-[10%] z-20 w-px
          bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent
          opacity-50 blur-[0.5px]
        "
      />

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-col">
        {/* Header */}
        <header className="mb-4 flex w-full shrink-0 items-center justify-between lg:mb-5">
          <div className="flex min-w-0 items-center gap-2">
            <Bookmark
              size={14}
              strokeWidth={2.2}
              className="
                shrink-0 text-[var(--gold)]
                drop-shadow-[0_0_8px_rgba(207,162,71,0.18)]
              "
            />

            <h3 className="truncate font-heading text-sm font-semibold text-[var(--gold-light)] lg:text-lg">
              Currently Reading
            </h3>
          </div>

          {hasBooks && (
            <span
              className="
                shrink-0 rounded-full
                border border-[rgba(248,237,203,0.10)]
                bg-[var(--brown-500)]/30
                px-2.5 py-1
                text-[11px] font-medium uppercase tracking-[0.18em]
                text-[var(--brown-100)]
              "
            >
              {books.length}
            </span>
          )}
        </header>

        {hasBooks ? (
          <>
            {/* Mobile */}
            <div className="w-full min-w-0 lg:hidden">
              <div className="flex w-full min-w-0 items-center gap-3.5 sm:gap-4">
                <div className="w-[92px] shrink-0 sm:w-[104px]">
                  <CurrentReadEmbla
                    books={books}
                    currentIndex={currentIndex}
                    onSelect={setCurrentIndex}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <CurrentReadDetails book={currentBook} />
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden w-full min-w-0 lg:block">
              <CurrentReadEmbla
                books={books}
                currentIndex={currentIndex}
                onSelect={setCurrentIndex}
              />

              <div className="mt-4 space-y-3">
                <CurrentReadProgress book={currentBook} />
                <CurrentReadDetails book={currentBook} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-4 text-center">
            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-full border border-[rgba(207,162,71,0.14)]
                bg-[var(--brown-500)]/30
                text-[var(--gold-light)]
                shadow-[0_0_18px_rgba(207,162,71,0.08)]
                lg:h-14 lg:w-14
              "
            >
              <BookMarked size={18} className="lg:hidden" />
              <BookMarked size={22} className="hidden lg:block" />
            </div>

            <div className="space-y-1">
              <p className="font-heading text-sm font-semibold text-[var(--brown-50)] lg:text-base">
                Nothing in progress
              </p>

              <p className="mx-auto max-w-[220px] text-xs leading-relaxed text-[var(--brown-200)] lg:text-sm">
                Add a book and mark it as current to see it here.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/search")}
              className="
                rounded-full bg-[var(--gold)]
                px-4 py-1.5
                text-xs font-medium text-[var(--brown-900)]
                transition-all duration-200
                hover:bg-[var(--gold-light)]
                hover:shadow-[0_6px_18px_rgba(207,162,71,0.18)]
                lg:text-sm
              "
            >
              Find a book
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
