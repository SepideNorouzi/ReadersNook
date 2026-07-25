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

        p-4
        lg:p-6

        ${className ?? ""}
      `}
    >
      {/* Mobile Header */}

      <div className="mb-3 flex items-center justify-between lg:hidden">
        <div className="flex items-center gap-2">
          <SquarePen size={13} className="text-[var(--brown-700)]" />

          <h2 className="font-heading text-[12px] font-semibold text-[var(--text)]">
            To Read
          </h2>
        </div>

        <span
          className="
            rounded-full
            bg-[var(--stone-200)]

            px-2
            py-0.5

            text-[10px]
            font-medium

            text-[var(--text-secondary)]
          "
        >
          {books.length}
        </span>
      </div>

      {/* Desktop Header */}

      <div className="hidden items-center justify-between lg:mb-5 lg:flex">
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

      {books.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center">
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
        <>
          {/* Mobile */}

          <div className="flex-1 lg:hidden scrollbar-hidden">
            <TbrBookGrid books={books} />
          </div>

          {/* Desktop */}

          <div className="relative hidden flex-1 overflow-hidden lg:block">
            <div
              className="
                h-full
                overflow-y-auto
                p-1
                scrollbar-hidden
                scrollbar-thin
                scrollbar-thumb-[var(--stone-300)]
                scrollbar-track-transparent
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
        </>
      )}
    </Card>
  );
}
