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

          ${className ?? ""}
        `}
      >
        <Quote size={30} className="mb-3 text-[var(--stone-300)]" />

        <p className="text-sm text-[var(--text-secondary)]">No saved quotes</p>
      </Card>
    );
  }

  const today = new Date().getDate();
  const quote = quotes[today % quotes.length];

  return (
    <Card
      className={`
        flex
        h-full
        flex-col

        rounded-[28px]

        border
        border-[var(--border)]

        bg-gradient-to-br
        from-white
        via-[var(--surface)]
        to-[var(--surface-hover)]

        p-6

        ${className ?? ""}
      `}
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Quote size={16} className="text-[var(--brown-600)]" />

          <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
            Quote
          </h2>
        </div>

        <span
          className="
            rounded-full
            bg-[var(--stone-200)]

            px-2.5
            py-1

            text-[10px]
            uppercase
            tracking-[0.15em]

            text-[var(--text-secondary)]
          "
        >
          Today
        </span>
      </div>

      <QuoteItem quote={quote} />
    </Card>
  );
}
