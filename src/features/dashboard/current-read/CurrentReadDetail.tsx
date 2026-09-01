import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function CurrentReadDetails({ book }: Props) {
  const percentage = Math.round(
    (book.currentPage / book.totalPages) * 100
  );

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="flex flex-1 flex-col justify-center gap-3 lg:hidden">

        {/* Title */}
        <div>
          <h4
            className="
              line-clamp-2
              font-heading
              text-sm
              font-semibold
              leading-snug
              text-[var(--text)]
            "
          >
            {book.title}
          </h4>

          <p
            className="
              mt-1
              line-clamp-1
              text-xs
              text-[var(--text-secondary)]
            "
          >
            {book.author}
          </p>
        </div>


        {/* Progress */}
        <div className="space-y-1">

          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.15em]
                text-[var(--text-muted)]
              "
            >
              Progress
            </span>

            <span
              className="
                text-[10px]
                font-medium
                text-[var(--text)]
              "
            >
              {percentage}%
            </span>
          </div>


          <div
            className="
              h-1.5
              overflow-hidden
              rounded-full
              bg-[var(--stone-300)]
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-[var(--brown-700)]
                transition-all
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
            border-[var(--border)]

            bg-[var(--stone-100)]

            px-3
            py-2
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.15em]
              text-[var(--text-muted)]
            "
          >
            Current
          </span>

          <span
            className="
              text-xs
              font-semibold
              text-[var(--text)]
            "
          >
            {book.currentPage} / {book.totalPages}
          </span>
        </div>

      </div>


      {/* ================= DESKTOP ================= */}

      <div className="hidden space-y-4 lg:block">

        <div>
          <h4
            className="
              line-clamp-2
              font-heading
              text-base
              font-semibold
              leading-snug
              text-[var(--text)]
            "
          >
            {book.title}
          </h4>

          <p
            className="
              mt-1
              text-sm
              text-[var(--text-secondary)]
            "
          >
            {book.author}
          </p>
        </div>


        <div className="h-px bg-[var(--border)]" />


        <div
          className="
            flex
            items-center
            justify-between

            rounded-xl
            border
            border-[var(--border)]

            bg-[var(--stone-100)]

            px-2
            py-2
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[var(--text-muted)]
            "
          >
            Current
          </span>

          <span
            className="
              text-[11px]
              font-medium
              text-[var(--text)]
            "
          >
            {book.currentPage} / {book.totalPages}
          </span>
        </div>

      </div>
    </>
  );
}