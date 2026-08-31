import { useMemo, useState } from "react";

import { useBooks } from "../hooks/useBooks";
import type { BookStatus } from "../types/book";
import LibraryFilters from "../features/library/LibraryFilters";
import BookCard from "../features/library/BookCard";

export default function Library() {
  const { data: books, isLoading } = useBooks();
  const [filter, setFilter] = useState<BookStatus | "all">("all");

  const counts = useMemo(() => {
    const base = { all: 0, current: 0, tbr: 0, read: 0 };
    if (!books) return base;
    for (const book of books) {
      base.all += 1;
      base[book.status] += 1;
    }
    return base;
  }, [books]);

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    return filter === "all" ? books : books.filter((b) => b.status === filter);
  }, [books, filter]);

  if (isLoading) {
    return (
      // mobile-first padding: 16px on phones, 24px at sm, back to 40px at lg
      <main className="p-4 sm:p-6 lg:p-10 pt-24 md:pt-0">
        <p className="text-[var(--text-muted)]">Loading your library...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8 p-4 sm:p-6 lg:p-10 pt-24 md:pt-0">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-[var(--text)]">
            Library
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {counts.all} books in your collection
          </p>
        </div>
      </div>

  <div
  className="
    rounded-[20px]
    border
    border-[var(--brown-200)]
    bg-[var(--surface)]
    p-2
    shadow-[var(--shadow-sm)]
  "
>
  <LibraryFilters active={filter} onChange={setFilter} counts={counts} />
</div>

      {filteredBooks.length === 0 ? (
        <p className="text-[var(--text-muted)]">No books match this filter.</p>
      ) : (
        // grid-cols-2 is the mobile baseline (always 2 flexible columns, never overflows).
        // From sm: (640px) up, we hand off to the original auto-fill/minmax pattern,
        // which needs that extra width to actually produce multiple columns.
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:[grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}