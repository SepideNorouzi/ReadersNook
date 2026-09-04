import { useState } from "react";
import { BookOpen, Check, Plus, Star } from "lucide-react";

import type { BookSearchResult } from "../../types/searchResults";
import Card from "../../ui/Card";
import { useCreateBook, useIsBookSaved } from "../../hooks/useBooks";
import { bookFromSearchResult } from "../../services/bookFromSearch";

type Props = {
  result: BookSearchResult;
};

export default function SearchResultCard({ result }: Props) {
  const [isHydrating, setIsHydrating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: addBook, isPending } = useCreateBook();

  const alreadySaved = useIsBookSaved(result.id, {
    title: result.title,
    author: result.author,
  });

  const isAdding = isHydrating || isPending;
  const hasRating = typeof result.averageRating === "number";

  const handleAdd = async () => {
    if (alreadySaved || isAdding) return;

    setErrorMessage(null);
    setIsHydrating(true);

    try {
      const book = await bookFromSearchResult(result);
      await addBook(book);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Couldn't add this book. Please try again.",
      );
    } finally {
      setIsHydrating(false);
    }
  };

  return (
    <Card
      className="
        group relative overflow-hidden
        rounded-[20px]
        border border-[var(--brown-200)]
        bg-[var(--surface)]
        p-0
        shadow-[0_8px_24px_rgba(72,45,30,0.07)]
        transition-all duration-400
        hover:-translate-y-1.5
        hover:shadow-[0_16px_36px_rgba(72,45,30,0.14)]
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none absolute -inset-1 -z-10
          rounded-[24px]
          bg-gradient-to-br
          from-[var(--orange)]/20
          via-[var(--gold)]/10
          to-[var(--brown-700)]/15
          opacity-0 blur-xl
          transition-opacity duration-500
          group-hover:opacity-70
        "
      />

      {/* Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[var(--stone-200)]">
        {result.coverUrl ? (
          <img
            src={result.coverUrl}
            alt={`Cover of ${result.title}`}
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-[1.045]
            "
            loading="lazy"
          />
        ) : (
          <div
            className="
              flex h-full w-full flex-col
              items-center justify-center gap-2
              bg-gradient-to-br
              from-[var(--stone-100)]
              to-[var(--brown-50)]
              text-[var(--text-muted)]
            "
          >
            <BookOpen size={24} />
            <span className="text-[10px]">No cover</span>
          </div>
        )}

        {/* Cover shading */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-black/50
            via-transparent
            to-white/10
          "
        />

        {/* Shine */}
        <div
          className="
            pointer-events-none
            absolute -left-1/3 top-0
            h-[160%] w-1/2 rotate-[18deg]
            bg-gradient-to-r
            from-transparent via-white/15 to-transparent
            opacity-0 blur-sm
            transition-all duration-700
            group-hover:left-[115%]
            group-hover:opacity-100
          "
        />

        {/* Page count */}
        {result.pageCount && (
          <span
            className="
              absolute bottom-2.5 right-2.5
              text-[9px] font-medium
              text-white/85 drop-shadow
            "
          >
            {result.pageCount} pages
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex min-h-[145px] flex-col gap-2.5 p-3.5">
        <div className="min-w-0">
          <h3
            className="
              line-clamp-2
              font-heading
              text-sm font-semibold leading-snug
              text-[var(--text)]
              transition-colors duration-300
              group-hover:text-[var(--brown-700)]
            "
          >
            {result.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-xs text-[var(--text-secondary)]">
            {result.author}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {hasRating ? (
            <div
              className="flex items-center gap-1"
              aria-label={`${result.averageRating} out of 5`}
            >
              <Star
                size={11}
                className="fill-[var(--gold)] text-[var(--gold)]"
              />

              <span className="text-[10px] font-medium text-[var(--text-muted)]">
                {result.averageRating!.toFixed(1)}
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-[var(--text-muted)]">
              No rating
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={alreadySaved || isAdding}
          aria-pressed={alreadySaved}
          className={`
            mt-auto
            flex w-full
            items-center justify-center gap-1.5
            rounded-xl
            px-3 py-2
            text-[11px] font-semibold
            transition-all duration-200
            ${
              alreadySaved
                ? `
                  border border-[var(--brown-200)]
                  bg-[var(--brown-50)]
                  text-[var(--brown-700)]
                `
                : `
                  bg-gradient-to-r
                  from-[var(--brown-900)]
                  to-[var(--brown-800)]
                  text-white
                  shadow-[0_5px_14px_rgba(72,45,30,0.16)]
                  hover:-translate-y-0.5
                  hover:shadow-[0_7px_18px_rgba(72,45,30,0.22)]
                `
            }
            disabled:cursor-not-allowed
            disabled:opacity-60
          `}
        >
          {alreadySaved ? <Check size={13} /> : <Plus size={13} />}

          {alreadySaved ? "Added" : isAdding ? "Adding..." : "Add to Library"}
        </button>

        {errorMessage && (
          <p className="text-[10px] leading-relaxed text-[var(--orange)]">
            {errorMessage}
          </p>
        )}
      </div>
    </Card>
  );
}
