import { Link } from "react-router";
import { Star } from "lucide-react";

import type { Book, BookStatus } from "../../types/book";
import Card from "../../ui/Card";
import { STATUS_OPTIONS } from "../Detail/hero/statusOptions";

const STATUS_LABELS: Record<BookStatus, string> = {
  current: "Reading",
  tbr: "TBR",
  read: "Finished",
};

const STATUS_STYLES: Record<
  BookStatus,
  {
    glow: string;
    badge: string;
    progress: string;
  }
> = {
  current: {
    glow: "hover:shadow-[0_18px_50px_rgba(207,104,45,0.22)]",
    badge: "bg-[var(--brown-900)]/70 text-white border-white/15",
    progress: "from-[var(--orange)] via-[var(--gold)] to-[var(--orange)]",
  },
  tbr: {
    glow: "hover:shadow-[0_18px_50px_rgba(111,85,66,0.18)]",
    badge: "bg-[var(--surface)]/80 text-[var(--text)] border-white/40",
    progress:
      "from-[var(--brown-500)] via-[var(--brown-400)] to-[var(--brown-700)]",
  },
  read: {
    glow: "hover:shadow-[0_18px_50px_rgba(191,151,70,0.22)]",
    badge: "bg-[var(--surface)]/85 text-[var(--text)] border-[var(--gold)]/30",
    progress: "from-[var(--gold)] via-[var(--orange)] to-[var(--brown-500)]",
  },
};

export default function BookCard({ book }: { book: Book }) {
  const progress =
    book.status === "current"
      ? Math.round((book.currentPage / book.totalPages) * 100)
      : null;

  const status = STATUS_OPTIONS.find((item) => item.value === book.status)!;
  const styles = STATUS_STYLES[book.status];

  return (
    <Link
      to={`/book/${book.id}`}
      className="group block transition-transform duration-300 active:scale-[0.985]"
    >
      <Card
        className={`
          relative overflow-hidden rounded-[22px] p-0
          border border-[var(--brown-200)]
          bg-[var(--surface)]
          shadow-[0_8px_24px_rgba(72,45,30,0.08)]
          transition-all duration-500
          hover:-translate-y-2
          ${styles.glow}
        `}
      >
        {/* Ambient glow */}
        <div
          className={`
            pointer-events-none absolute -inset-1 -z-10
            rounded-[26px]
            bg-gradient-to-br
            opacity-0 blur-xl
            transition-opacity duration-500
            group-hover:opacity-70
            ${
              book.status === "current"
                ? "from-[var(--orange)]/90 via-[var(--gold)]/70 to-[var(--brown-700)]/80"
                : book.status === "tbr"
                  ? "from-[var(--brown-500)]/80 via-[var(--stone-300)]/80 to-[var(--brown-700)]/80"
                  : "from-[var(--gold)]/90 via-[var(--orange)]/65 to-[var(--brown-700)]/80"
            }
          `}
        />

        {/* Cover */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-[var(--stone-200)]">
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-[1.055]
            "
          />

          {/* Bottom fade */}
          <div
            className="
              pointer-events-none absolute inset-x-0 bottom-0 h-1/2
              bg-gradient-to-t from-black/55 via-black/10 to-transparent
            "
          />

          {/* Warm overlay */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-br
              from-white/12 via-transparent to-[var(--brown-900)]/15
              opacity-70
            "
          />

          {/* Shine */}
          <div
            className="
              pointer-events-none absolute -left-1/3 top-0
              h-[160%] w-1/2 rotate-[18deg]
              bg-gradient-to-r from-transparent via-white/15 to-transparent
              opacity-0 blur-sm
              transition-all duration-700
              group-hover:left-[115%] group-hover:opacity-100
            "
          />

          {/* Status */}
          <span
            className={`
              absolute left-2.5 top-2.5
              flex items-center gap-1.5
              rounded-full border
              px-2 py-1
              text-[9px] font-semibold
              tracking-wide
              backdrop-blur-lg
              ${styles.badge}
            `}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {STATUS_LABELS[book.status]}
          </span>

          {/* Pages */}
          <span
            className="
              absolute bottom-2.5 right-2.5
              text-[9px] font-medium
              text-white/80
              drop-shadow
            "
          >
            {book.totalPages} pages
          </span>
        </div>

        {/* Body */}
        <div className="flex min-h-[110px] flex-col gap-2 p-3.5">
          <div className="min-w-0">
            <h3
              className="
                line-clamp-1
                font-heading text-[15px] font-semibold leading-snug
                text-[var(--text)]
                transition-colors duration-300
                group-hover:text-[var(--brown-700)]
              "
            >
              {book.title}
            </h3>

            <p className="mt-1 line-clamp-1 text-xs text-[var(--text-secondary)]">
              {book.author}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between pt-1">
            <div
              className="flex items-center gap-0.5"
              aria-label={`${book.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={
                    i < book.rating
                      ? "fill-[var(--gold)] text-[var(--gold)]"
                      : "text-[var(--stone-300)]"
                  }
                />
              ))}
            </div>

            {progress !== null && (
              <span className="text-[9px] font-medium text-[var(--text-muted)]">
                {book.currentPage}/{book.totalPages}
              </span>
            )}
          </div>

          {/* Progress */}
          {progress !== null && (
            <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--stone-200)]">
              <div
                className={`
                  h-full rounded-full
                  bg-gradient-to-r
                  transition-all duration-700
                  ${styles.progress}
                `}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
