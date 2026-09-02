import { Quote , Trash2 } from "lucide-react";

type Quote = {
  id: string;
  bookId: string;
  text: string;
  page?: number | null;
  bookTitle: string;
  bookAuthor?: string;
};

type Props = {
  quote: Quote;
  onDelete: (bookId: string, quoteId: string) => void;
  isDeleting: boolean;
};

export default function QuoteCard({
  quote,
  onDelete,
  isDeleting,
}: Props) {
  return (
    <article
      className="
        group relative overflow-hidden
        rounded-[20px]
        border border-[var(--brown-200)]
        bg-[var(--surface)]
        px-4 py-5
        shadow-[0_6px_22px_rgba(72,45,30,0.06)]
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-[var(--gold)]/45
        hover:shadow-[0_14px_32px_rgba(72,45,30,0.10)]
        sm:px-6 sm:py-6
      "
    >
      {/* Soft ambient glow */}
      <div
        className="
          pointer-events-none
          absolute -right-12 -top-12
          h-32 w-32
          rounded-full
          bg-[var(--gold)]/8
          blur-3xl
          transition-opacity duration-300
          group-hover:bg-[var(--gold)]/12
        "
      />

      {/* Decorative quote mark */}
      <div
        className="
          pointer-events-none
          absolute
          right-5 top-1
          font-serif
          text-6xl
          leading-none
          text-[var(--gold)]/12
          select-none
          sm:right-6
        "
      >
        ”
      </div>

      <div className="relative">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Accent */}
          <div
            className="
              mt-1
              h-12 w-1
              shrink-0
              rounded-full
              bg-gradient-to-b
              from-[var(--gold)]
              via-[var(--orange)]
              to-transparent
              sm:h-14
            "
          />

          <blockquote className="min-w-0 flex-1">
            <p
              className="
                font-heading
                text-[15px]
                leading-7
                text-[var(--text)]
                sm:text-lg
                sm:leading-8
              "
            >
              “{quote.text}”
            </p>

            <footer className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs">
              <span
                className="
                  font-semibold
                  text-[var(--brown-800)]
                "
              >
                {quote.bookTitle}
              </span>

              {quote.bookAuthor && (
                <>
                  <span className="text-[var(--stone-400)]">·</span>

                  <span className="text-[var(--text-secondary)]">
                    {quote.bookAuthor}
                  </span>
                </>
              )}

              {quote.page && (
                <>
                  <span className="text-[var(--stone-400)]">·</span>

                  <span className="text-[var(--text-muted)]">
                    p. {quote.page}
                  </span>
                </>
              )}
            </footer>
          </blockquote>

          <button
            type="button"
            onClick={() => onDelete(quote.bookId, quote.id)}
            disabled={isDeleting}
            aria-label="Delete quote"
            title="Delete quote"
            className="
              flex h-7 w-7 shrink-0
              items-center justify-center
              rounded-lg
              text-[var(--text-muted)]
              transition-all duration-200
              hover:bg-red-50
              hover:text-red-500
              disabled:cursor-not-allowed
              disabled:opacity-40
              sm:opacity-0
              sm:group-hover:opacity-100
              sm:group-focus-within:opacity-100
            "
          >
            <Trash2 size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}