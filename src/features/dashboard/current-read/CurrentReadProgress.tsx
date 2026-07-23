import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function CurrentReadProgress({ book }: Props) {
  const percentage = Math.round((book.currentPage / book.totalPages) * 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.18em]

            text-[var(--text-muted)]
          "
        >
          Progress
        </span>

        <span className="font-semibold text-[12px] text-[var(--text-muted)]">{percentage}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#ECE3D8]">
        <div
          className="h-full rounded-full bg-[#2C1810] transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
