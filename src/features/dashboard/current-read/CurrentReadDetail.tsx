import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function CurrentReadDetails({ book }: Props) {
  const percentage = Math.round((book.currentPage / book.totalPages) * 100);

  return (
    <>
      {/* ================= MOBILE ================= */}

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 lg:hidden">
        {/* Title + author */}
        <div className="min-w-0">
          <h4
            className="
              line-clamp-2
              min-w-0

              font-heading
              text-sm
              font-semibold
              leading-snug

              text-[var(--brown-50)]
            "
          >
            {book.title}
          </h4>

          <p
            className="
              mt-1
              line-clamp-1
              truncate

              text-xs

              text-[var(--brown-200)]
            "
          >
            {book.author}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.15em]

                text-[var(--brown-300)]
              "
            >
              Progress
            </span>

            <span
              className="
                text-[10px]
                font-semibold

                text-[var(--gold-light)]

                drop-shadow-[0_0_6px_rgba(207,162,71,0.18)]
              "
            >
              {percentage}%
            </span>
          </div>

          <div
            className="
              h-1.5
              w-full
              overflow-hidden
              rounded-full

              bg-[var(--brown-900)]/45
            "
          >
            <div
              className="
                h-full
                rounded-full

                bg-gradient-to-r
                from-[var(--gold)]
                to-[var(--orange)]

                shadow-[0_0_7px_rgba(207,162,71,0.32)]

                transition-all
                duration-500
              "
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>

        {/* Current page */}
        <div
          className="
            flex
            items-center
            justify-between

            rounded-xl

            border
            border-[var(--brown-300)]/20

            bg-[var(--brown-900)]/25

            px-3
            py-2

            shadow-[inset_0_1px_0_rgba(246,234,211,0.04)]
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.15em]

              text-[var(--brown-300)]
            "
          >
            Current
          </span>

          <span
            className="
              text-xs
              font-semibold

              text-[var(--gold-light)]
            "
          >
            {book.currentPage} / {book.totalPages}
          </span>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden min-w-0 space-y-4 lg:block">
        {/* Title + author */}
        <div className="min-w-0">
          <h4
            className="
              line-clamp-2

              font-heading
              text-base
              font-semibold
              leading-snug

              text-[var(--brown-50)]
            "
          >
            {book.title}
          </h4>

          <p
            className="
              mt-1
              text-sm

              text-[var(--brown-200)]
            "
          >
            {book.author}
          </p>
        </div>

        {/* Divider */}
        <div
          className="
            h-px
            bg-gradient-to-r
            from-transparent
            via-[var(--brown-300)]/25
            to-transparent
          "
        />

        {/* Current page */}
        <div
          className="
            flex
            items-center
            justify-between

            rounded-xl

            border
            border-[var(--brown-300)]/20

            bg-[var(--brown-900)]/25

            px-3
            py-2

            shadow-[inset_0_1px_0_rgba(246,234,211,0.04)]
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.18em]

              text-[var(--brown-300)]
            "
          >
            Current
          </span>

          <span
            className="
              text-[11px]
              font-semibold

              text-[var(--gold-light)]
            "
          >
            {book.currentPage} / {book.totalPages}
          </span>
        </div>
      </div>
    </>
  );
}
