import { useEffect, useState } from "react";
import { Check, Quote as QuoteIcon, Trash2, X } from "lucide-react";

type Quote = {
  id: string;
  bookId: string;
  text: string;
  page?: number | null;
  bookTitle: string;
  bookAuthor?: string;
};

interface Props {
  quote: Quote;
  onDelete: (bookId: string, quoteId: string) => void;
  isDeleting: boolean;
}

export default function QuoteCard({ quote, onDelete, isDeleting }: Props) {
  const [confirming, setConfirming] = useState(false);

  /*
   * Once confirmation mode is opened, automatically cancel it after
   * three seconds so the card does not stay armed for accidental
   * future taps.
   */
  useEffect(() => {
    if (!confirming) return;

    const timeout = setTimeout(() => {
      setConfirming(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [confirming]);

  function handleDeleteClick() {
    /*
     * First tap:
     * Enter confirmation mode.
     *
     * Nothing is deleted yet.
     */
    if (!confirming) {
      setConfirming(true);
      return;
    }

    /*
     * Second tap:
     * Actually request deletion.
     */
    onDelete(quote.bookId, quote.id);

    /*
     * Leave confirmation mode immediately after the delete action
     * has been triggered. The mutation itself is controlled by the
     * parent through isDeleting.
     */
    setConfirming(false);
  }

  function handleCancelDelete() {
    setConfirming(false);
  }

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        min-h-[120px]
        flex-col
        justify-between
        overflow-hidden
        rounded-[22px]
        border
        border-stone-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        sm:min-h-[180px]
        sm:rounded-[28px]
        sm:p-6
      "
    >
      {/* Soft ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-[var(--gold)]/8
          blur-3xl
          transition-opacity
          duration-300
          group-hover:bg-[var(--gold)]/12
        "
      />

      {/* Delete controls */}
      <div
        className="
          absolute
          right-3
          top-3
          z-10
          flex
          items-center
          gap-1.5
          sm:right-4
          sm:top-4
        "
      >
        {/* Cancel confirmation */}
        {confirming && (
          <button
            type="button"
            onClick={handleCancelDelete}
            disabled={isDeleting}
            aria-label="Cancel delete"
            title="Cancel"
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
              hover:text-stone-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Delete / confirm button */}
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={isDeleting}
          aria-label={confirming ? "Confirm delete quote" : "Delete quote"}
          title={confirming ? "Confirm delete" : "Delete quote"}
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
                ? `
                  bg-red-500
                  text-white
                  opacity-100
                  hover:bg-red-600
                `
                : `
                  bg-stone-100
                  text-stone-400
                  opacity-100
                  hover:bg-red-50
                  hover:text-red-500
                  sm:opacity-0
                  sm:group-hover:opacity-100
                  sm:group-focus-within:opacity-100
                `
            }
          `}
        >
          {isDeleting ? (
            <span
              className="
                h-3.5
                w-3.5
                animate-spin
                rounded-full
                border-2
                border-current
                border-t-transparent
              "
            />
          ) : confirming ? (
            <Check className="h-4 w-4" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Quote icon */}
      <QuoteIcon
        className="
          relative
          h-4
          w-4
          text-[#C68B3C]
          sm:h-5
          sm:w-5
        "
      />

      {/* Quote text */}
      <p
        className="
          relative
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
        “{quote.text}”
      </p>

      {/* Footer */}
      <div
        className="
          relative
          mt-5
          flex
          items-center
          justify-between
          sm:mt-8
        "
      >
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span
            className="
              max-w-[180px]
              truncate
              rounded-full
              bg-stone-100
              px-2.5
              py-1
              text-xs
              text-stone-600
              sm:max-w-[220px]
              sm:px-3
              sm:text-sm
            "
            title={quote.bookTitle}
          >
            {quote.bookTitle}
          </span>

          {quote.page != null && quote.page > 0 && (
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
          )}
        </div>
      </div>
    </article>
  );
}
