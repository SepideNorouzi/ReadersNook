import { useState } from "react";
import { BookOpen, Check, Plus, Star } from "lucide-react";

import type { BookSearchResult } from "../../types/searchResults";
import Card from "../../components/ui/Card";
import { useCreateBook, useIsBookSaved } from "../../hooks/useBooks";
import { bookFromSearchResult } from "../../services/bookFromSearch";

type Props = {
  result: BookSearchResult;
};

export default function SearchResultCard({ result }: Props) {
  const hasRating = typeof result.averageRating === "number";
  const { mutateAsync: addBook, isPending } = useCreateBook();
  const alreadySaved = useIsBookSaved(result.id);
  // Covers both the works-detail fetch and the save mutation.
  const [isHydrating, setIsHydrating] = useState(false);
  const isAdding = isHydrating || isPending;

  const handleAdd = async () => {
    if (alreadySaved || isAdding) return;

    setIsHydrating(true);
    try {
      const book = await bookFromSearchResult(result);
      await addBook(book);
    } finally {
      setIsHydrating(false);
    }
  };

  return (
    <Card>
      <div className="flex gap-4 p-4">
        {/* Cover — many catalog entries omit one, so use a real fallback */}
        <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-md bg-[var(--stone-200)]">
          {result.coverUrl ? (
            <img
              src={result.coverUrl}
              alt={`Cover of ${result.title}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <BookOpen size={24} className="text-[var(--text-muted)]" />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="font-heading text-sm font-semibold text-[var(--text)] line-clamp-2">
            {result.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-1">
            {result.author}
          </p>

          {hasRating && (
            <div className="flex items-center gap-1">
              <Star
                size={13}
                className="fill-[var(--gold)] text-[var(--gold)]"
              />
              <span className="text-xs text-[var(--text-muted)]">
                {result.averageRating!.toFixed(1)}
              </span>
            </div>
          )}

          {result.pageCount && (
            <span className="text-xs text-[var(--text-muted)]">
              {result.pageCount} pages
            </span>
          )}

          <button
            type="button"
            onClick={handleAdd}
            disabled={alreadySaved || isAdding}
            aria-pressed={alreadySaved}
            className="mt-auto flex w-fit items-center gap-1.5 rounded-full
              bg-gradient-to-r from-[var(--brown-900)] to-[var(--brown-800)]
              px-3 py-1.5 text-xs font-medium text-white shadow-[var(--shadow)]
              transition-opacity disabled:opacity-50"
          >
            {alreadySaved ? <Check size={14} /> : <Plus size={14} />}
            {alreadySaved
              ? "Added"
              : isAdding
                ? "Adding..."
                : "Add to Library"}
          </button>
        </div>
      </div>
    </Card>
  );
}
