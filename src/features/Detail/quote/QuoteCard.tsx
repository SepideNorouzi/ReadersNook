import { useEffect, useState } from "react";
import { Check, Heart, Quote as QuoteIcon, Trash2, X } from "lucide-react";

import type { Quote } from "../../../types/quote";
import { useDeleteQuote } from "../../../hooks/useQuotes";

interface Props {
  quote: Quote;
}

export default function QuoteCard({ quote }: Props) {
  const [confirming, setConfirming] = useState(false);
  const deleteQuote = useDeleteQuote();

  // Auto-disarm the confirm state so an ignored tap doesn't leave
  // the card sitting in a "one tap from deletion" state forever.
  useEffect(() => {
    if (!confirming) return;
    const timeout = setTimeout(() => setConfirming(false), 3000);
    return () => clearTimeout(timeout);
  }, [confirming]);

  function handleDeleteClick() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    deleteQuote.mutate(
      { bookId: quote.bookId, quoteId: quote.id },
      { onSettled: () => setConfirming(false) },
    );
  }

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        min-h-[220px]
        sm:min-h-[280px]
        flex-col
        justify-between
        rounded-[22px]
        sm:rounded-[28px]
        border
        border-stone-200
        bg-white
        p-4
        sm:p-6
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Delete control */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 sm:right-4 sm:top-4">
        {confirming && (
          <button
            type="button"
            onClick={() => setConfirming(false)}
            aria-label="Cancel delete"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-stone-100
              text-stone-500
              transition-colors
              hover:bg-stone-200
            "
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={deleteQuote.isPending}
          aria-label={confirming ? "Confirm delete quote" : "Delete quote"}
          className={`
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            transition-all
            duration-200
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${
              confirming
                ? "bg-red-500 text-white opacity-100 hover:bg-red-600"
                : "bg-stone-100 text-stone-400 opacity-100 hover:bg-red-50 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
            }
          `}
        >
          {confirming ? (
            <Check className="h-4 w-4" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Quote Icon */}
      <QuoteIcon className="h-4 w-4 text-[#C68B3C] sm:h-5 sm:w-5" />

      {/* Quote */}
      <p
        className="
          mt-4
          flex-1
          pr-8
          text-base
          leading-7
          text-stone-700
          sm:mt-6
          sm:pr-0
          sm:text-lg
          sm:leading-8
        "
      >
        "{quote.text}"
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between sm:mt-8">
        <span
          className="
            rounded-full
            bg-stone-100
            px-2.5
            py-1
            text-xs
            text-stone-600
            sm:px-3
            sm:text-sm
          "
        >
          Page {quote.page}
        </span>

        <Heart className="h-4 w-4 fill-pink-300 text-pink-500 sm:h-5 sm:w-5" />
      </div>
    </article>
  );
}