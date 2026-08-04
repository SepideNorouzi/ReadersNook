// src/pages/Library.tsx
import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";

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
      <main className="p-10">
        <p className="text-[var(--text-muted)]">Loading your library...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8 p-10">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brown-900)] via-[var(--brown-700)] to-[var(--brown-500)] text-white shadow-[0_12px_30px_rgba(54,35,27,.28)]">
          <BookOpen size={22} />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-[var(--text)]">
            Library
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {counts.all} books in your collection
          </p>
        </div>
      </div>

      <LibraryFilters active={filter} onChange={setFilter} counts={counts} />

      {filteredBooks.length === 0 ? (
        <p className="text-[var(--text-muted)]">No books match this filter.</p>
      ) : (
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
