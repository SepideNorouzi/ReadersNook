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
        h-full

        rounded-[28px]

        border
        border-[var(--border)]

        bg-gradient-to-b
        from-white
        to-[var(--surface-hover)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[var(--shadow-lg)]

        ${className ?? ""}
      `}
    >
      {/* ======================= MOBILE ======================= */}

      <div className="flex h-full flex-col lg:hidden">
        <div className="flex items-center gap-2">
          <Target
            size={13}
            className="text-[var(--gold)]"
          />

          <h2 className="font-heading text-[12px] font-semibold text-[var(--text)]">
            Reading Goal
          </h2>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <CircularProgress
            value={progress}
            size={70}
            strokeWidth={5}
          />
        </div>

        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-[var(--stone-200)]">
            <div
              className="h-full rounded-full bg-[var(--brown-900)] transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="text-center text-xs font-medium text-[var(--text-secondary)]">
            <span className="text-[var(--text)]">
              {booksRead}
            </span>{" "}
            / {yearlyGoal} books
          </p>
        </div>
        <div className="mt-5">
            {remaining > 0 ? (
              <p className="text-center text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--gold)]">
                  {remaining}
                </span>{" "}
                books left.
              </p>
            ) : (
              <p className="text-center text-sm font-medium text-[var(--green)]">
                🎉 Congratulations! Goal achieved.
              </p>
            )}
          </div>
      </div>
      

      {/* ======================= DESKTOP ======================= */}

      <div className="hidden h-full flex-col lg:flex">
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

        {/* Circle */}

        <div className="flex flex-1 items-center justify-center">
          <CircularProgress value={progress} />
        </div>

        {/* Footer */}

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
      </div>
    </Card>
  );
}