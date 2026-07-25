import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function CurrentReadDetails({ book }: Props) {
  return (
    <>
      {/* ======================= MOBILE ======================= */}

      <div className="space-y-2 lg:hidden">
        <div>
          <h4
            className="
              line-clamp-2

              font-heading
              text-[15px]
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

        {/* Compact Current Section */}
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
          <p
            className="
      text-[8px]
      uppercase
      tracking-[0.18em]

      text-[var(--text-muted)]
    "
          >
            Current
          </p>

          <p
            className="
      shrink-0

      text-[8px]
      font-medium

      text-[var(--text)]
    "
          >
            {book.currentPage} / {book.totalPages}
          </p>
        </div>
      </div>

      {/* ======================= DESKTOP ======================= */}

      <div className="hidden space-y-4 lg:block">
        {/* Book Info */}

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

              line-clamp-1

              text-sm

              text-[var(--text-secondary)]
            "
          >
            {book.author}
          </p>
        </div>

        {/* Divider */}

        <div className="h-px bg-[var(--border)]" />

        {/* Current Reading */}

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
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.18em]

              text-[var(--text-muted)]
            "
          >
            Current
          </p>

          <p
            className="
              shrink-0

              text-[11px]
              font-medium

              text-[var(--text)]
            "
          >
            {book.currentPage} / {book.totalPages}
          </p>
        </div>
      </div>
    </>
  );
}
