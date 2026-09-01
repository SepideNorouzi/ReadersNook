import { Quote as QuoteIcon, Trash2 } from "lucide-react";
import { useDeleteQuote } from "../hooks/useQuotes";
import Card from "../components/ui/Card";
import { useBooks } from "../hooks/useBooks";

export default function Quotes() {
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const deleteQuote = useDeleteQuote();

  const quotes = books.flatMap((book) =>
    (book.quotes ?? []).map((quote) => ({
      ...quote,
      bookTitle: book.title,
    })),
  );

  const handleDelete = (bookId: string, quoteId: string) => {
    deleteQuote.mutate({
      bookId,
      quoteId,
    });
  };

  return (
    <section>
      {/* Section heading */}
      <div className="mb-5">
        <h2 className="font-heading text-xl font-semibold text-[var(--text)]">
          Added Quotes
        </h2>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Quotes you've saved from your reading journey.
        </p>
      </div>

      {/* Quotes */}
      {quotes.length === 0 ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <QuoteIcon size={28} className="mb-3 text-[var(--text-muted)]" />

            <p className="font-medium text-[var(--text)]">
              No quotes added yet
            </p>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              The quotes you save from your books will appear here.
            </p>
          </div>
        </Card>
      ) : (
        <div
          className="
            flex flex-col gap-4
            max-h-[28rem]
            overflow-y-auto
            pr-2

            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-[var(--border)]
          "
        >
          {quotes.map((quote) => (
            <Card key={quote.id} className="relative shrink-0">
              <div className="flex items-start gap-4">
                {/* Quote content */}
                <div className="min-w-0 flex-1 border-l-4 border-[var(--gold)] pl-4">
                  <p className="font-heading text-lg leading-relaxed text-[var(--text)]">
                    “{quote.text}”
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="truncate">{quote.bookTitle}</span>

                    {quote.page && (
                      <span className="shrink-0">· Page {quote.page}</span>
                    )}
                  </div>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleDelete(quote.bookId, quote.id)}
                  disabled={deleteQuote.isPending}
                  aria-label="Delete quote"
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-lg
                    text-[var(--text-muted)]
                    transition-colors
                    hover:bg-red-50
                    hover:text-red-500
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
