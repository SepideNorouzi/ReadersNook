
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

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <Card
        className={`
          flex
          h-fit
          w-full
          min-w-0
          items-center
          justify-center
          self-start

          rounded-[22px]
          sm:rounded-[28px]

          bg-[linear-gradient(135deg,var(--brown-600)_0%,var(--brown-700)_48%,var(--brown-800)_100%)]

          border
          border-[rgba(207,162,71,0.16)]

          p-4
          lg:p-6

          shadow-[var(--shadow-premium)]

          ${className ?? ""}
        `}
      >
        <p className="text-sm text-[var(--gold-light)]">Loading...</p>
      </Card>
    );
  }

  const hasBooks = books.length > 0;
  const currentBook = books[currentIndex];

  return (
    <Card
      className={`
        relative
        isolate

        flex
        h-fit
        w-full
        min-w-0
        flex-col
        self-start
        overflow-hidden

        rounded-[22px]
        sm:rounded-[28px]

        bg-[linear-gradient(135deg,var(--brown-600)_0%,var(--brown-700)_48%,var(--brown-800)_100%)]

        border
        border-[rgba(207,162,71,0.18)]

        p-3.5
        sm:p-4
        lg:p-6

        transition-all
        duration-300
        ease-out

        shadow-[var(--shadow-premium)]

        hover:-translate-y-1.5
        hover:border-[rgba(207,162,71,0.28)]
        hover:shadow-[var(--shadow-premium-hover)]

        ${className ?? ""}
      `}
    >
      {/* ================= HEADER ================= */}

      <header className="mb-4 flex w-full shrink-0 items-center justify-between lg:mb-5">
        <div className="flex min-w-0 items-center gap-2">
          <Bookmark
            size={14}
            className="
              hidden
              shrink-0
              text-[var(--gold)]
              lg:block
            "
          />

          <h3
            className="
              truncate
              font-heading
              text-sm
              font-semibold
              text-[var(--gold-light)]
              lg:text-lg
            "
          >
            Currently Reading
          </h3>
        </div>

        {hasBooks && (
          <span
            className="
              shrink-0
              rounded-full
              bg-[var(--brown-500)]/30

              px-2.5
              py-1

              text-[11px]
              font-medium
              uppercase
              tracking-[0.18em]

              text-[var(--brown-100)]
            "
          >
            {books.length}
          </span>
        )}
      </header>

      {hasBooks ? (
        <>
          {/* ================= MOBILE ================= */}

          <div className="flex h-fit w-full min-w-0 lg:hidden">
            <div className="flex w-full min-w-0 items-center gap-3.5 sm:gap-4">
              {/* Cover */}

              <div className="w-[92px] shrink-0 sm:w-[104px]">
                <CurrentReadEmbla
                  books={books}
                  currentIndex={currentIndex}
                  onSelect={setCurrentIndex}
                />
              </div>

              {/* Details */}

              <div className="min-w-0 flex-1">
                <CurrentReadDetails book={currentBook} />
              </div>
            </div>
          </div>

          {/* ================= DESKTOP ================= */}

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
        /* ================= EMPTY STATE ================= */

        <div
          className="
            flex
            h-fit
            w-full
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
              bg-[var(--brown-500)]/30

              text-[var(--gold-light)]

              lg:h-14
              lg:w-14
            "
          >
            <BookMarked size={18} className="lg:hidden" />
            <BookMarked size={22} className="hidden lg:block" />
          </div>

          <div className="space-y-1">
            <p
              className="
                font-heading
                text-sm
                font-semibold
                text-[var(--brown-50)]

                lg:text-base
              "
            >
              Nothing in progress
            </p>

            <p
              className="
                mx-auto
                max-w-[220px]
                text-xs
                leading-relaxed
                text-[var(--brown-200)]

                lg:text-sm
              "
            >
              Add a book and mark it as current to see it here.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/search")}
            className="
              mt-1

              rounded-full
              bg-[var(--gold)]

              px-4
              py-1.5

              text-xs
              font-medium
              text-[var(--brown-900)]

              transition-all
              duration-200

              hover:bg-[var(--gold-light)]
              hover:shadow-[0_6px_18px_rgba(207,162,71,0.18)]

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

