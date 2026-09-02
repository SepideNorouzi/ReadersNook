import { useMemo } from "react";

import { useBooks } from "../hooks/useBooks";
import { useDeleteQuote } from "../hooks/useQuotes";
import QuotesGrid from "../features/addedQuotes/QuotesGrid";
import QuotesEmpty from "../features/addedQuotes/QuotesEmpty";
import QuotesHeader from "../features/addedQuotes/QuotesHeader";
import QuotesList from "../features/addedQuotes/QuotesList";

export default function Quotes() {
  const { data: books = [], isLoading } = useBooks();
  const deleteQuote = useDeleteQuote();

  const quotes = useMemo(
    () =>
      books.flatMap((book) =>
        (book.quotes ?? []).map((quote) => ({
          ...quote,
          bookTitle: book.title,
          bookAuthor: book.author,
        })),
      ),
    [books],
  );

  const handleDelete = (bookId: string, quoteId: string) => {
    deleteQuote.mutate({ bookId, quoteId });
  };

  return (
    <main className="w-full p-4 pt-20 sm:p-6 lg:p-12 lg:pt-20">
      <div className="mx-auto max-w-5xl">
        {isLoading ? (
          <QuotesGrid />
        ) : quotes.length === 0 ? (
          <QuotesEmpty />
        ) : (
          <>
            <QuotesHeader count={quotes.length} />
            <QuotesList
              quotes={quotes}
              onDelete={handleDelete}
              isDeleting={deleteQuote.isPending}
            />
          </>
        )}
      </div>
    </main>
  );
}