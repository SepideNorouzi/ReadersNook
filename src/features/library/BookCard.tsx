import { Link } from "react-router";
import { Star } from "lucide-react";

import type { Book } from "../../types/book";
import Card from "../../components/ui/Card";
import { STATUS_OPTIONS } from "../Detail/hero/StatusBadge";

export default function BookCard({ book }: { book: Book }) {
  const progress =
    book.status === "current"
      ? Math.round((book.currentPage / book.totalPages) * 100)
      : null;

  const status = STATUS_OPTIONS.find((s) => s.value === book.status)!;

  return (
    <Link to={`/book/${book.id}`} className="group block">
      <Card
        className="
          flex flex-col overflow-hidden p-0
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        {/* Cover */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-[var(--stone-200)]">
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700 backdrop-blur-sm">
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-heading text-base font-semibold text-[var(--text)] line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-1">
            {book.author}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2">
            <div
              className="flex items-center gap-0.5"
              aria-label={`${book.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < book.rating
                      ? "fill-[var(--gold)] text-[var(--gold)]"
                      : "text-[var(--stone-300)]"
                  }
                />
              ))}
            </div>
            {progress !== null && (
              <span className="text-xs font-medium text-[var(--text-muted)]">
                {progress}%
              </span>
            )}
          </div>

          {progress !== null && (
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--stone-200)]">
              <div
                className="h-full rounded-full bg-[var(--orange)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
