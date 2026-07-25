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
flex
h-full
flex-col

rounded-[28px]

className="
relative
overflow-hidden

bg-gradient-to-br
from-[var(--brown-200)]
via-[var(--brown-100)]
to-[var(--brown-300)]

border
border-[var(--brown-200)]

shadow-[var(--shadow)]
"

hover:-translate-y-1
transition-all
duration-300

p-4
lg:p-6

${className ?? ""}
`}
    >
      {/* Mobile Header */}

      <div className="mb-3 flex items-center gap-2 lg:hidden">
        <Quote size={13} className="text-[var(--brown-600)]" />

        <h2 className="font-heading text-[12px] font-semibold text-[var(--text)]">
          Quote
        </h2>
      </div>

      {/* Desktop Header */}

      <div className="hidden items-center justify-between lg:mb-6 lg:flex">
        <div className="flex items-center gap-2">
          <Quote size={16} className="text-[var(--brown-600)]" />

          {/* Mobile */}
          <h2 className="font-heading text-[12px] font-semibold text-[var(--text)] lg:hidden">
            Quote
          </h2>

          {/* Desktop */}
          <h2 className="hidden font-heading text-lg font-semibold text-[var(--text)] lg:block">
            Daily Quote
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

      <div className="flex flex-1">
        <QuoteItem quote={quote} />
      </div>
    </Card>
  );
}
