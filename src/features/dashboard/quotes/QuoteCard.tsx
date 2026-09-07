import { Quote, Sparkles } from "lucide-react";
import Card from "../../../ui/Card";
import { useBooks } from "../../../hooks/useBooks";
import QuoteItem from "./QuoteItem";
import Loading from "../../../shared/Loading";

interface Props {
  className?: string;
}

export default function QuoteCard({ className }: Props) {
  const { data: books = [], isLoading } = useBooks();

  if (isLoading) {
    return (
      <Card
        className={`
          flex h-full items-center justify-center
          rounded-[22px] sm:rounded-[28px]
          ${className ?? ""}
        `}
      >
        <Loading />
      </Card>
    );
  }

  const quotes = books.flatMap((book) =>
    book.quotes.map((quote) => ({
      ...quote,
      bookTitle: book.title,
    })),
  );

  const today = new Date().getDate();
  const quote = quotes[today % quotes.length];

  if (!quotes.length) {
    return (
      <Card
        className={`
        flex h-full flex-col items-center justify-center gap-3
        rounded-[22px] sm:rounded-[28px]
        border border-[rgba(164,125,93,0.28)]
        bg-gradient-to-br from-[var(--brown-200)] via-[var(--brown-100)] to-[var(--brown-300)]
        p-3.5 text-center shadow-[0_18px_40px_rgba(35,23,17,0.10),0_0_24px_rgba(207,162,71,0.08)]
        sm:p-4
        lg:p-6
        ${className ?? ""}
      `}
      >
        <div
          className="
          flex h-11 w-11 items-center justify-center rounded-full
          border border-[rgba(164,125,93,0.20)]
          bg-[rgba(248,237,203,0.62)]
          shadow-[0_4px_12px_rgba(164,125,93,0.10)]
          lg:h-14 lg:w-14
        "
        >
          <Quote size={18} className="text-[var(--brown-700)] lg:size-[22px]" />
        </div>

        <div className="space-y-1">
          <p className="font-heading text-sm font-semibold text-[var(--brown-900)] lg:text-base">
            No quotes yet
          </p>
          <p className="mx-auto max-w-[200px] text-xs leading-relaxed text-[var(--brown-700)] lg:text-sm">
            Save a line that stays with you while you read.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`
        group
        relative
        isolate

        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden

        rounded-[22px]
        sm:rounded-[28px]

        border
        border-[rgba(164,125,93,0.28)]

        bg-gradient-to-br
        from-[var(--brown-200)]
        via-[var(--brown-100)]
        to-[var(--brown-300)]

        p-3.5
        sm:p-4
        lg:p-6

        shadow-[0_18px_40px_rgba(35,23,17,0.10),0_0_24px_rgba(207,162,71,0.08)]

        transition-all
        duration-500
        ease-out

        hover:-translate-y-1
        hover:border-[rgba(164,125,93,0.40)]
        hover:shadow-[0_28px_55px_rgba(35,23,17,0.14),0_0_34px_rgba(207,162,71,0.12)]

        ${className ?? ""}
      `}
    >
      {/* Warm accent lighting */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[
            radial-gradient(
              circle_at_100%_0%,
              rgba(207,162,71,0.26),
              transparent_28%
            ),
            radial-gradient(
              circle_at_0%_100%,
              rgba(185,109,69,0.16),
              transparent_30%
            ),
            radial-gradient(
              circle_at_70%_65%,
              rgba(112,19,25,0.05),
              transparent_34%
            )
          ]
        "
      />

      {/* Soft top shine */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[10%]
          right-[10%]
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-[rgba(248,237,203,0.9)]
          to-transparent

          opacity-80
        "
      />

      {/* Inner highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[1px]

          rounded-[inherit]

          border
          border-white/[0.35]

          shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]
        "
      />

      {/* Decorative quote */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-4px]
          top-[-10px]

          font-serif
          text-[150px]
          leading-none

          text-[var(--brown-400)]

          opacity-[0.18]

          transition-all
          duration-500

          group-hover:rotate-3
          group-hover:scale-105
          group-hover:opacity-[0.24]

          lg:text-[175px]
        "
      >
        ”
      </span>

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {/* Header */}
        <header className="mb-3 flex shrink-0 items-center justify-between sm:mb-4 lg:mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center

                rounded-full

                border
                border-[rgba(164,125,93,0.20)]

                bg-[rgba(248,237,203,0.62)]

                shadow-[0_4px_12px_rgba(164,125,93,0.10)]
              "
            >
              <Quote size={14} className="text-[var(--brown-700)]" />
            </div>

            <div>
              <h2
                className="
                  font-heading
                  text-sm
                  font-semibold

                  text-[var(--brown-900)]

                  lg:text-lg
                "
              >
                <span className="lg:hidden">Quote</span>
                <span className="hidden lg:inline">Daily Quote</span>
              </h2>

              <p
                className="
                  mt-0.5
                  hidden

                  text-[9px]
                  uppercase
                  tracking-[0.16em]

                  text-[var(--brown-500)]

                  lg:block
                "
              >
                A thought worth keeping
              </p>
            </div>
          </div>

          <span
            className="
              flex
              items-center
              gap-1.5

              rounded-full

              border
              border-[rgba(164,125,93,0.20)]

              bg-[rgba(248,237,203,0.58)]

              px-2.5
              py-1

              text-[9px]
              font-semibold
              uppercase
              tracking-[0.14em]

              text-[var(--brown-700)]

              shadow-[0_4px_12px_rgba(164,125,93,0.08)]
            "
          >
            <Sparkles size={9} className="text-[var(--gold)]" />
            Today
          </span>
        </header>

        <div className="min-h-0 flex-1">
          <QuoteItem quote={quote} />
        </div>
      </div>
    </Card>
  );
}
