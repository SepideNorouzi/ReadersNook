import QuoteCard from "./QuoteCard";

type Quote = {
  id: string;
  bookId: string;
  text: string;
  page?: number | null;
  bookTitle: string;
  bookAuthor?: string;
};

type Props = {
  quotes: Quote[];
  onDelete: (bookId: string, quoteId: string) => void;
  isDeleting: boolean;
};

export default function QuotesList({
  quotes,
  onDelete,
  isDeleting,
}: Props) {
  return (
    <div
      className="
        max-h-[calc(100vh-13rem)]
        overflow-y-auto
        pr-1
        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-[var(--border)]
      "
    >
      <div className="grid gap-4 sm:gap-5">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}