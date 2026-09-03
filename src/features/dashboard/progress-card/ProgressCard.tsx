import { Target, Sparkles, Trophy } from "lucide-react";
import Card from "../../../components/ui/Card";
import { useReadingGoal } from "../../../hooks/useReadingGoal";
import CircularProgress from "../../../components/ui/CircularProgress";
import Loading from "../../../components/Loading";

interface ProgressCardProps {
  className?: string;
}

export default function ProgressCard({ className }: ProgressCardProps) {
  const { booksRead, yearlyGoal, progress, isLoading } = useReadingGoal();

  if (isLoading) {
    return (
      <Card
        className={`
          relative flex h-full min-h-0 items-center justify-center
          overflow-hidden rounded-[22px] sm:rounded-[28px]
          border border-[rgba(207,162,71,0.16)]
          bg-[linear-gradient(145deg,var(--surface)_0%,var(--bg-secondary)_55%,var(--surface-hover)_100%)]
          shadow-[var(--shadow-premium)]
          ${className ?? ""}
        `}
      >
          <Loading />
      </Card>
    );
  }

  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const remaining = Math.max(yearlyGoal - booksRead, 0);
  const achieved = remaining === 0;

  const progressBar =
    "h-2 overflow-hidden rounded-full border border-[rgba(207,162,71,0.08)] bg-[var(--stone-200)] shadow-[inset_0_1px_3px_rgba(35,23,17,0.10)]";

  const progressFill =
    "h-full rounded-full bg-gradient-to-r from-[var(--brown-700)] via-[var(--gold)] to-[var(--orange)] shadow-[0_0_8px_rgba(207,162,71,0.32),0_0_16px_rgba(185,109,69,0.10),inset_0_1px_0_rgba(248,237,203,0.35)] transition-all duration-700 ease-out";

  return (
    <Card
      className={`
        group relative isolate h-full min-h-0 overflow-hidden
        rounded-[22px] border border-[rgba(207,162,71,0.20)]
        bg-[linear-gradient(145deg,var(--surface)_0%,var(--surface-hover)_52%,var(--bg-secondary)_100%)]
        shadow-[var(--shadow-premium)]
        transition-all duration-500 ease-out
        hover:-translate-y-1.5
        hover:border-[rgba(207,162,71,0.34)]
        hover:shadow-[var(--shadow-premium-hover)]
        ${className ?? ""}
      `}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          bg-[radial-gradient(circle_at_50%_38%,rgba(207,162,71,0.16),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(185,109,69,0.10),transparent_28%),radial-gradient(circle_at_0%_100%,rgba(123,90,69,0.08),transparent_30%)]
          transition-all duration-700
          group-hover:scale-105
        "
      />

      {/* Inner frame */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-[1px] z-0
          rounded-[inherit] border border-black/[0.025]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.70),inset_0_-1px_0_rgba(35,23,17,0.05)]
        "
      />

      {/* Top highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[18%] right-[18%] top-0 z-0
          h-px bg-gradient-to-r from-transparent
          via-[rgba(207,162,71,0.55)] to-transparent
          opacity-70 blur-[0.5px]
          transition-all duration-500
          group-hover:left-[12%] group-hover:right-[12%] group-hover:opacity-100
        "
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {/* ======================= MOBILE ======================= */}
        <div className="flex h-full min-h-0 flex-col px-4 py-4 sm:px-5 sm:py-5 lg:hidden">
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="
                  flex h-7 w-7 items-center justify-center rounded-full
                  bg-[var(--gold-light)]
                  shadow-[0_0_12px_rgba(207,162,71,0.12)]
                "
              >
                <Target
                  size={12}
                  strokeWidth={2.3}
                  className="text-[var(--gold)]"
                />
              </div>

              <div>
                <h2 className="font-heading text-sm font-semibold leading-none text-[var(--text)]">
                  Reading Goal
                </h2>

                <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                  Yearly challenge
                </p>
              </div>
            </div>

            <span
              className="
                rounded-full border border-[rgba(207,162,71,0.14)]
                bg-[var(--gold-light)] px-2.5 py-1
                text-[9px] font-semibold uppercase tracking-[0.14em]
                text-[var(--gold)]
              "
            >
              2026
            </span>
          </header>

          {/* Progress ring */}
          <div className="flex flex-1 flex-col items-center justify-center py-5">
            <div className="relative">
              <div
                aria-hidden="true"
                className="
                  absolute inset-0 rounded-full bg-[var(--gold)]
                  opacity-[0.08] blur-2xl
                "
              />

              <CircularProgress
                value={safeProgress}
                mobileSize={96}
                size={96}
                strokeWidth={7}
              />

              <div
                className="
                  absolute -right-1 -top-1 flex h-7 w-7
                  items-center justify-center rounded-full
                  border border-[rgba(248,237,203,0.55)]
                  bg-gradient-to-br from-[var(--gold)] to-[var(--orange)]
                  text-[var(--brown-900)]
                  shadow-[0_4px_12px_rgba(207,162,71,0.25)]
                "
              >
                {achieved ? (
                  <Trophy size={12} strokeWidth={2.4} />
                ) : (
                  <Sparkles size={12} strokeWidth={2.4} />
                )}
              </div>
            </div>

            <p className="mt-3 text-[10px] uppercase tracking-[0.17em] text-[var(--text-muted)]">
              Progress
            </p>

            <p className="mt-1 text-base font-semibold text-[var(--text)]">
              {booksRead}
              <span className="font-normal text-[var(--text-secondary)]">
                {" "}
                / {yearlyGoal} books
              </span>
            </p>
          </div>

          {/* Stats + progress */}
          <div className="shrink-0">
            <div className="grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                  Completed
                </p>

                <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                  {booksRead}
                  <span className="ml-1 font-normal text-[var(--text-secondary)]">
                    books
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                  {achieved ? "Status" : "Remaining"}
                </p>

                {achieved ? (
                  <p className="mt-1 flex items-center justify-end gap-1 text-sm font-semibold text-[var(--green)]">
                    <Trophy size={12} />
                    Achieved
                  </p>
                ) : (
                  <p className="mt-1 text-sm font-semibold text-[var(--gold)]">
                    {remaining} books
                  </p>
                )}
              </div>
            </div>

            <div className={`${progressBar} mt-4`}>
              <div
                className={progressFill}
                style={{ width: `${safeProgress}%` }}
              />
            </div>

            <p className="mt-2 text-center text-[10px] text-[var(--text-secondary)]">
              {achieved ? (
                <span className="font-semibold text-[var(--green)]">
                  Goal achieved 🎉
                </span>
              ) : (
                <>
                  <span className="font-semibold text-[var(--gold)]">
                    {remaining}
                  </span>{" "}
                  books left this year
                </>
              )}
            </p>
          </div>
        </div>

        {/* ======================= DESKTOP ======================= */}
        <div className="hidden h-full min-h-0 flex-col p-5 lg:flex">
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between">
            <div className="flex items-start gap-2.5">
              <div
                className="
                  mt-1 flex h-5 w-5 items-center justify-center
                  rounded-full bg-[var(--gold-light)]
                  shadow-[0_0_16px_rgba(207,162,71,0.10)]
                "
              >
                <Target
                  size={15}
                  strokeWidth={2.2}
                  className="text-[var(--gold)]"
                />
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
                  Reading Goal
                </h2>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Your yearly challenge
                </p>
              </div>
            </div>

            <span
              className="
                rounded-full border border-[rgba(207,162,71,0.15)]
                bg-[var(--gold-light)] px-3 py-1.5
                text-[10px] font-semibold uppercase tracking-[0.16em]
                text-[var(--gold)]
                shadow-[0_4px_12px_rgba(207,162,71,0.08)]
              "
            >
              2026
            </span>
          </header>

          {/* Hero */}
          <div className="relative flex flex-1 items-center justify-center py-4">
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute h-40 w-40 rounded-full
                bg-[radial-gradient(circle,rgba(207,162,71,0.18)_0%,rgba(185,109,69,0.08)_42%,transparent_70%)]
                blur-xl transition-transform duration-700
                group-hover:scale-110
              "
            />

            <div className="relative">
              <CircularProgress
                value={safeProgress}
                size={156}
                strokeWidth={11}
              />

              <div
                className="
                  absolute -right-2 -top-1 flex h-9 w-9
                  items-center justify-center rounded-full
                  border border-[rgba(248,237,203,0.65)]
                  bg-gradient-to-br from-[var(--gold)] to-[var(--orange)]
                  text-[var(--brown-900)]
                  shadow-[0_8px_18px_rgba(207,162,71,0.24),0_0_18px_rgba(207,162,71,0.16)]
                  transition-all duration-500
                  group-hover:-translate-y-0.5
                  group-hover:rotate-6
                  group-hover:shadow-[0_10px_22px_rgba(207,162,71,0.30),0_0_22px_rgba(207,162,71,0.22)]
                "
              >
                {achieved ? (
                  <Trophy size={17} strokeWidth={2.2} />
                ) : (
                  <Sparkles size={17} strokeWidth={2.2} />
                )}
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Progress
                </p>

                <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                  {booksRead}
                  <span className="font-normal text-[var(--text-secondary)]">
                    {" "}
                    / {yearlyGoal} books
                  </span>
                </p>
              </div>

              <div className="h-9 w-px bg-[var(--border)]" />

              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {achieved ? "Status" : "Remaining"}
                </p>

                {achieved ? (
                  <p className="mt-1 flex items-center justify-end gap-1.5 text-sm font-semibold text-[var(--green)]">
                    <Trophy size={13} />
                    Achieved
                  </p>
                ) : (
                  <p className="mt-1 text-sm font-semibold text-[var(--gold)]">
                    {remaining} books
                  </p>
                )}
              </div>
            </div>

            <div className={`${progressBar} mt-4`}>
              <div
                className={progressFill}
                style={{ width: `${safeProgress}%` }}
              />
            </div>

            {/* <div className="mt-3">
              {achieved ? (
                <p className="flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-[var(--green)]">
                  <Trophy size={14} />
                  Congratulations — goal achieved!
                </p>
              ) : (
                <p className="text-center text-sm text-[var(--text-secondary)]">
                  Only{" "}
                  <span className="font-semibold text-[var(--gold)]">
                    {remaining}
                  </span>{" "}
                  books left this year.
                </p>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </Card>
  );
}
