import { Quote } from "lucide-react";
import Card from "../../../components/ui/Card";
import { useBooks } from "../../../hooks/useBooks";
import QuoteItem from "./QuoteItem";

interface Props {
  className?: string;
}

export default function QuoteCard({ className }: Props) {
  const { data: books = [], isLoading } = useBooks();

  if (isLoading) {
    return (
      <Card
        className={`flex h-full items-center justify-center ${className ?? ""}`}
      >
        <p className="text-sm text-[var(--text-secondary)]">Loading...</p>
      </Card>
    );
  }

  const quotes = books.flatMap((book) =>
    book.quotes.map((quote) => ({
      ...quote,
      bookTitle: book.title,
    })),
  );

  if (!quotes.length) {
    return (
      <Card
        className={`
          flex
          h-full
          flex-col
          items-center
          justify-center

          p-4
          lg:p-6

          ${className ?? ""}
        `}
      >
        <Quote
          size={26}
          className="mb-2 text-[var(--stone-300)] lg:mb-3 lg:size-[30px]"
        />

        <p className="text-center text-xs text-[var(--text-secondary)] lg:text-sm">
          No saved quotes
        </p>
      </Card>
    );
  }

  const today = new Date().getDate();
  const quote = quotes[today % quotes.length];

  return (
    <Card
      className={`
        relative
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden

        rounded-[22px]
        sm:rounded-[28px]

        border
        border-[var(--brown-200)]

        bg-gradient-to-br
        from-[var(--brown-200)]
        via-[var(--brown-100)]
        to-[var(--brown-300)]

        p-3.5
        sm:p-4
        lg:p-6

        shadow-[var(--shadow)]

        transition-all
        duration-300
        hover:-translate-y-1

        ${className ?? ""}
      `}
    >
      {/* Header */}
      <div className="mb-2.5 flex shrink-0 items-center justify-between sm:mb-3 lg:mb-6">
        <div className="flex items-center gap-2">
          <Quote
            size={13}
            className="text-[var(--brown-600)] lg:size-4"
          />

          <h2 className="font-heading text-sm font-semibold text-[var(--text)] lg:text-lg">
            <span className="lg:hidden">Quote</span>
            <span className="hidden lg:inline">Daily Quote</span>
          </h2>
        </div>

        <span
          className="
            rounded-full
            bg-[var(--stone-300)]
            px-2
            py-0.5
            sm:px-2.5
            sm:py-1

            text-[9px]
            sm:text-[10px]
            uppercase
            tracking-[0.15em]

            text-[var(--text)]
          "
        >
          Today
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        <QuoteItem quote={quote} />
      </div>
    </Card>
  );
}
