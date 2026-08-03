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
        min-h-0
        flex-col

        rounded-[22px]
        sm:rounded-[28px]

        border
        border-[var(--border)]

        bg-gradient-to-b
        from-white
        to-[var(--surface-hover)]

        p-3.5
        sm:p-4
        lg:p-6

        ${className ?? ""}
      `}
    >
      {/* Header */}
      <div className="mb-3 flex shrink-0 items-center justify-between lg:mb-5">
        <div className="flex items-center gap-2">
          <SquarePen
            size={14}
            className="text-[var(--brown-700)] lg:size-4"
          />

          <h2 className="font-heading text-sm font-semibold text-[var(--text)] sm:text-[15px] lg:text-lg">
            <span className="lg:hidden">To Read</span>
            <span className="hidden lg:inline">To Be Read</span>
          </h2>
        </div>

        <span
          className="
            rounded-full
            bg-[var(--stone-200)]

            px-2
            py-0.5
            sm:px-2.5
            sm:py-1

            text-[10px]
            sm:text-[11px]
            font-medium

            text-[var(--text-secondary)]
          "
        >
          {books.length}
        </span>
      </div>

      {books.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <BookOpen
            size={26}
            className="mb-2 text-[var(--stone-300)] lg:mb-3 lg:size-[34px]"
          />

          <p className="text-center text-xs text-[var(--text-secondary)] lg:text-sm">
            Your shelf is empty.
          </p>

          <p className="mt-1 text-center text-[11px] text-[var(--text-muted)] lg:text-xs">
            Add a few books you'd love to read.
          </p>
        </div>
      ) : (
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className="
              h-full
              overflow-y-auto
              overflow-x-hidden
              p-0.5
              scrollbar-hidden
            "
          >
            <TbrBookGrid books={books} />
          </div>

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
