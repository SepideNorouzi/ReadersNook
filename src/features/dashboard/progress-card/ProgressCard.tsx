import { Target } from "lucide-react";
import Card from "../../../components/ui/Card";
import { useReadingGoal } from "../../../hooks/useReadingGoal";
import CircularProgress from "../../../components/ui/CircularProgress";

interface ProgressCardProps {
  className?: string;
}

export default function ProgressCard({
  className,
}: ProgressCardProps) {
  const {
    booksRead,
    yearlyGoal,
    progress,
    isLoading,
  } = useReadingGoal();

  if (isLoading) {
    return (
      <Card
        className={`
          flex
          h-full
          items-center
          justify-center

          ${className ?? ""}
        `}
      >
        <p className="text-sm text-[var(--text-secondary)]">
          Loading...
        </p>
      </Card>
    );
  }

  const remaining = Math.max(yearlyGoal - booksRead, 0);

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

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[var(--shadow-lg)]

        ${className ?? ""}
      `}
    >
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Target
            size={16}
            strokeWidth={2.2}
            className="text-[var(--gold)]"
          />

          <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
            Reading Goal
          </h2>
        </div>

        <span
          className="
            rounded-full

            bg-[var(--gold-light)]

            px-2.5
            py-1

            text-[11px]
            font-medium
            uppercase
            tracking-[0.15em]

            text-[var(--gold)]
          "
        >
          2026
        </span>
      </header>

      {/* Progress Circle */}
      <div className="flex flex-1 items-center justify-center">
        <CircularProgress value={progress} />
      </div>

      {/* Stats */}
      <div className="mt-5 border-t border-[var(--border)] pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.18em]

                text-[var(--text-muted)]
              "
            >
              Progress
            </p>

            <p className="mt-1 text-sm text-[var(--text)]">
              {booksRead} / {yearlyGoal} books
            </p>
          </div>

          <div className="text-right">
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.18em]

                text-[var(--text-muted)]
              "
            >
              Remaining
            </p>

            <p className="mt-1 text-sm font-medium text-[var(--text)]">
              {remaining}
            </p>
          </div>
        </div>

        <div className="mt-5">
          {remaining > 0 ? (
            <p className="text-center text-sm text-[var(--text-secondary)]">
              Only{" "}
              <span className="font-semibold text-[var(--gold)]">
                {remaining}
              </span>{" "}
              books left this year.
            </p>
          ) : (
            <p className="text-center text-sm font-medium text-[var(--green)]">
              🎉 Congratulations! Goal achieved.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}