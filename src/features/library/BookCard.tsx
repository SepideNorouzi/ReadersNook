// src/features/Library/BookCard.tsx
import { Link } from "react-router";
import { Star } from "lucide-react";

import type { Book } from "../../types/book";
import { statusConfig } from "./statusConfig";

export default function BookCard({ book }: { book: Book }) {
  const progress =
    book.status === "current"
      ? Math.round((book.currentPage / book.totalPages) * 100)
      : null;

  return (
    <Link
      to={`/book/${book.id}`}
      className="
        group flex flex-col overflow-hidden rounded-2xl
        bg-[var(--surface)] border border-[var(--border)]
        shadow-[var(--shadow-sm)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]
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
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[book.status].badgeClass}`}
        >
          {statusConfig[book.status].label}
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
    </Link>
  );
}
