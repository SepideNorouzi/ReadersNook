import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function CurrentReadDetails({ book }: Props) {
  return (
    <div className="space-y-4">
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
      <div className="flex items-end justify-between">
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

            text-sm
            font-medium

            text-[var(--text)]
          "
        >
          {book.currentPage} / {book.totalPages}
        </p>
      </div>
    </div>
  );
}