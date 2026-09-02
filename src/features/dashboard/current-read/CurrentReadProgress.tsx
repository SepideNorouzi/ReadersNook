import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function CurrentReadProgress({ book }: Props) {
  const percentage = Math.round(
    (book.currentPage / book.totalPages) * 100,
  );

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-[var(--brown-300)]
          "
        >
          Progress
        </span>

        <span
          className="
            text-[11px]
            font-semibold
            text-[var(--gold-light)]

            drop-shadow-[0_0_6px_rgba(207,162,71,0.22)]
          "
        >
          {percentage}%
        </span>
      </div>

      <div
        className="
          relative
          h-2.5
          w-full
          overflow-hidden
          rounded-full

          border
          border-[rgba(207,162,71,0.08)]

          bg-[var(--brown-900)]/50

          shadow-[
            inset_0_1px_3px_rgba(35,23,17,0.35),
            0_0_10px_rgba(207,162,71,0.025)
          ]
        "
      >
        <div
          className="
            relative
            h-full
            rounded-full

            bg-gradient-to-r
            from-[var(--gold)]
            via-[var(--gold)]
            to-[var(--orange)]

            shadow-[
              0_0_7px_rgba(207,162,71,0.40),
              0_0_18px_rgba(207,162,71,0.18),
              inset_0_1px_0_rgba(248,237,203,0.28)
            ]

            transition-all
            duration-500
            ease-out

            after:absolute
            after:inset-y-0
            after:right-0
            after:w-8

            after:bg-gradient-to-r
            after:from-transparent
            after:to-[rgba(248,237,203,0.18)]
            after:blur-[2px]
          "
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}