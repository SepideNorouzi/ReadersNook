import { BookOpen, Plus, Star } from "lucide-react";

import type { BookSearchResult } from "../../types/searchResults";
import Card from "../../components/ui/Card";

type Props = {
  result: BookSearchResult;
  onAdd: (result: BookSearchResult) => void;
  isAdding?: boolean; // will be driven by a mutation's `isPending` later
};

export default function SearchResultCard({ result, onAdd, isAdding }: Props) {
  const hasRating = typeof result.averageRating === "number";

  return (
    <Card>
      <div className="flex gap-4 p-4">
        {/* Cover — Google omits this for plenty of books, so i need
            a real fallback, not just a broken <img> */}
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

          {/* Rating only renders when Google actually sent one */}
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
            onClick={() => onAdd(result)}
            disabled={isAdding}
            className="mt-auto flex w-fit items-center gap-1.5 rounded-full
              bg-gradient-to-r from-[var(--brown-900)] to-[var(--brown-800)]
              px-3 py-1.5 text-xs font-medium text-white shadow-[var(--shadow)]
              transition-opacity disabled:opacity-50"
          >
            <Plus size={14} />
            {isAdding ? "Adding..." : "Add to Library"}
          </button>
        </div>
      </div>
    </Card>
  );
}
