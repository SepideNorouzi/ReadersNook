import { BookOpen, SquarePen } from "lucide-react";
import Card from "../../../components/ui/Card";
import { useTBRBooks } from "../../../hooks/useTbr";
import TbrBookGrid from "./TbrBookGrid";

interface Props {
  className?: string;
}

export default function TBRCard({ className }: Props) {
  const { books, isLoading } = useTBRBooks();

  if (isLoading) {
    return (
      <Card
        className={`flex h-full items-center justify-center ${className ?? ""}`}
      >
        <p className="text-sm text-[var(--text-secondary)]">Loading...</p>
      </Card>
    );
  }

  return (
    <Card
      className={`
        flex
        h-full
        flex-col

        rounded-[28px]

        border
        border-[var(--border)]

        bg-gradient-to-b
        from-white
        to-[var(--surface-hover)]

        p-6

        ${className ?? ""}
      `}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SquarePen size={16} className="text-[var(--brown-700)]" />

          <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
            To Be Read
          </h2>
        </div>

        <span
          className="
            rounded-full
            bg-[var(--stone-200)]
            px-2.5
            py-1

            text-[11px]
            font-medium

            text-[var(--text-secondary)]
          "
        >
          {books.length}
        </span>
      </div>

      {/* Shelf */}
      {books.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <BookOpen size={34} className="mb-3 text-[var(--stone-300)]" />

          <p className="text-sm text-[var(--text-secondary)]">
            Your shelf is empty.
          </p>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Add a few books you'd love to read.
          </p>
        </div>
      ) : (
        <div className="relative flex-1 overflow-hidden">
          <div
            className="
              h-full
              overflow-y-auto
              pr-2

              scrollbar-thin
              scrollbar-thumb-[var(--stone-300)]
              scrollbar-track-transparent
            "
          >
            <TbrBookGrid books={books} />
          </div>

          {/* Bottom fade */}
          <div
            className="
              pointer-events-none

              absolute
              bottom-0
              left-0
              right-0

              h-8

              bg-gradient-to-t
              from-[var(--surface)]
              to-transparent
            "
          />
        </div>
      )}
    </Card>
  );
}
