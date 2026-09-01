import { Quote as QuoteIcon, Trash2 } from "lucide-react";

import Card from "../components/ui/Card";
import { useBooks } from "../hooks/useBooks";
import { useDeleteQuote } from "../hooks/useQuotes";

export default function Quotes() {
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const deleteQuote = useDeleteQuote();

  const quotes = books.flatMap((book) =>
    (book.quotes ?? []).map((quote) => ({
      ...quote,
      bookTitle: book.title,
      bookAuthor: book.author,
    })),
  );

  const handleDelete = (bookId: string, quoteId: string) => {
    deleteQuote.mutate({
      bookId,
      quoteId,
    });
  };

  return (
    <section className="w-full sm:pt-20">

      {/* Loading */}
      {booksLoading ? (
        <Card>
          <div
            className="
              max-h-[calc(100vh-5rem)]
              space-y-3
              overflow-hidden
              px-4 py-4
              sm:px-5
            "
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="
                  animate-pulse
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--surface)]
                  px-5 py-5
                "
              >
                <div className="mb-4 h-3 w-16 rounded bg-[var(--bg-secondary)]" />

                <div className="space-y-2">
                  <div className="h-5 w-full rounded bg-[var(--bg-secondary)]" />
                  <div className="h-5 w-10/12 rounded bg-[var(--bg-secondary)]" />
                </div>

                <div className="mt-5 h-4 w-36 rounded bg-[var(--bg-secondary)]" />
              </div>
            ))}
          </div>
        </Card>
      ) : quotes.length === 0 ? (
        /* Empty state */
        <Card>
          <div className="flex min-h-[20rem] flex-col items-center justify-center px-6 py-12 text-center">
            <div
              className="
                mb-5 flex h-14 w-14 items-center justify-center
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--bg-secondary)]
                text-[var(--gold)]
              "
            >
              <QuoteIcon size={24} strokeWidth={1.7} />
            </div>

            <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
              No saved quotes yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
              The quotes you save from your books will appear here.
            </p>
          </div>
        </Card>
      ) : (
        /* Quotes container */
        <Card
          className="
            overflow-hidden
            border border-[var(--border)]
          "
        >
          {/* Container header */}
          <div
            className="
              flex items-center justify-between
              border-b border-[var(--border)]
              px-5 py-4
              sm:px-6
            "
          >
            <div className="flex items-center gap-2.5">
              <QuoteIcon
                size={18}
                strokeWidth={1.7}
                className="text-[var(--gold)]"
              />

              <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
                Your quotes
              </h2>
            </div>

            <span className="text-xs text-[var(--text-muted)]">
              {quotes.length} {quotes.length === 1 ? "quote" : "quotes"}
            </span>
          </div>

          {/* Scrollable quote list */}
          <div
            className="
              max-h-[calc(100vh-12rem)]
              overflow-y-auto
              p-3
              sm:p-4

              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-[var(--border)]
            "
          >
            <div className="space-y-3">
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  className="
                    group relative
                    rounded-xl
                    border border-[var(--border)]
                    bg-[var(--surface)]
                    px-4 py-4
                    transition-all duration-200

                    hover:border-[var(--gold)]
                    hover:shadow-sm

                    sm:px-5 sm:py-5
                  "
                >
                  <div className="flex items-start gap-4">
                    {/* Quote content */}
                    <div className="min-w-0 flex-1">
                      <blockquote
                        className="
                          border-l-2
                          border-[var(--gold)]
                          pl-4
                        "
                      >
                        <p
                          className="
                            font-heading
                            text-base leading-7
                            text-[var(--text)]

                            sm:text-lg
                            sm:leading-8
                          "
                        >
                          “{quote.text}”
                        </p>
                      </blockquote>

                      {/* Metadata */}
                      <div
                        className="
                          mt-4
                          flex flex-wrap items-center
                          gap-x-2.5 gap-y-1
                          pl-4
                          text-xs
                          sm:text-sm
                        "
                      >
                        <span className="font-medium text-[var(--text)]">
                          {quote.bookTitle}
                        </span>

                        {quote.bookAuthor && (
                          <>
                            <span className="text-[var(--text-muted)]">·</span>

                            <span className="text-[var(--text-secondary)]">
                              {quote.bookAuthor}
                            </span>
                          </>
                        )}

                        {quote.page && (
                          <>
                            <span className="text-[var(--text-muted)]">·</span>

                            <span className="text-[var(--text-secondary)]">
                              Page {quote.page}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDelete(quote.bookId, quote.id)}
                      disabled={deleteQuote.isPending}
                      aria-label="Delete quote"
                      title="Delete quote"
                      className="
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-lg
                        text-[var(--text-muted)]
                        opacity-100
                        transition-all duration-200

                        hover:bg-red-50
                        hover:text-red-500

                        disabled:cursor-not-allowed
                        disabled:opacity-50

                        sm:opacity-0
                        sm:group-hover:opacity-100
                        sm:group-focus-within:opacity-100
                      "
                    >
                      <Trash2 size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Card>
      )}
    </section>
  );
}
