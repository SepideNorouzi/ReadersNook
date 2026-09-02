import { Target, Sparkles, Trophy } from "lucide-react";
import Card from "../../../components/ui/Card";
import { useReadingGoal } from "../../../hooks/useReadingGoal";
import CircularProgress from "../../../components/ui/CircularProgress";

interface ProgressCardProps {
  className?: string;
}

export default function ProgressCard({ className }: ProgressCardProps) {
  const { booksRead, yearlyGoal, progress, isLoading } = useReadingGoal();

  if (isLoading) {
    return (
      <Card
        className={`
          relative
          flex
          h-full
          min-h-0
          items-center
          justify-center
          overflow-hidden

          rounded-[22px]
          sm:rounded-[28px]

          border
          border-[rgba(207,162,71,0.16)]

          bg-[linear-gradient(
            145deg,
            var(--surface)_0%,
            var(--bg-secondary)_55%,
            var(--surface-hover)_100%
          )]

          shadow-[var(--shadow-premium)]

          ${className ?? ""}
        `}
      >
        <p className="relative z-10 text-sm text-[var(--text-secondary)]">
          Loading...
        </p>
      </Card>
    );
  }

  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const remaining = Math.max(yearlyGoal - booksRead, 0);
  const achieved = remaining === 0;

  return (
    <Card
      className={`
        group
        relative
        isolate

        h-full
        min-h-0
        overflow-hidden

        rounded-[22px]
        sm:rounded-[28px]

        border
        border-[rgba(207,162,71,0.20)]

        bg-[linear-gradient(
          145deg,
          var(--surface)_0%,
          var(--surface-hover)_52%,
          var(--bg-secondary)_100%
        )]

        shadow-[var(--shadow-premium)]

        transition-all
        duration-500
        ease-out

        hover:-translate-y-1.5
        hover:border-[rgba(207,162,71,0.34)]
        hover:shadow-[var(--shadow-premium-hover)]

        ${className ?? ""}
      `}
    >
      {/* ====================================================== */}
      {/* Ambient lighting                                      */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[
            radial-gradient(
              circle_at_50%_38%,
              rgba(207,162,71,0.16),
              transparent_30%
            ),
            radial-gradient(
              circle_at_100%_0%,
              rgba(185,109,69,0.10),
              transparent_28%
            ),
            radial-gradient(
              circle_at_0%_100%,
              rgba(123,90,69,0.08),
              transparent_30%
            )
          ]

          transition-all
          duration-700

          group-hover:scale-105
          group-hover:opacity-100
        "
      />

      {/* ====================================================== */}
      {/* Fine inner frame                                      */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[1px]
          z-0

          rounded-[inherit]

          border
          border-black/[0.025]

          shadow-[
            inset_0_1px_0_rgba(255,255,255,0.70),
            inset_0_-1px_0_rgba(35,23,17,0.05)
          ]
        "
      />

      {/* ====================================================== */}
      {/* Top decorative light                                  */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[18%]
          right-[18%]
          top-0
          z-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-[rgba(207,162,71,0.55)]
          to-transparent

          blur-[0.5px]

          opacity-70

          transition-all
          duration-500

          group-hover:left-[12%]
          group-hover:right-[12%]
          group-hover:opacity-100
        "
      />

      {/* ====================================================== */}
      {/* CONTENT                                               */}
      {/* ====================================================== */}

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {/* ======================= MOBILE ======================= */}

        <div className="flex h-full min-h-0 flex-col lg:hidden">
          {/* Header */}

          <header className="flex shrink-0 items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center

                  rounded-full

                  bg-[var(--gold-light)]

                  shadow-[0_0_12px_rgba(207,162,71,0.12)]
                "
              >
                <Target
                  size={10}
                  strokeWidth={2.3}
                  className="text-[var(--gold)]"
                />
              </div>

              <h2
                className="
                  font-heading
                  text-[11px]
                  font-semibold
                  leading-tight
                  text-[var(--text)]

                  sm:text-[12px]
                "
              >
                Reading Goal
              </h2>
            </div>

            <span
              className="
                rounded-full

                border
                border-[rgba(207,162,71,0.14)]

                bg-[var(--gold-light)]

                px-2
                py-1

                text-[9px]
                font-semibold
                uppercase
                tracking-[0.14em]

                text-[var(--gold)]
              "
            >
              2026
            </span>
          </header>

          {/* Hero */}

          <div className="relative flex flex-1 items-center justify-center py-3">
            {/* glow behind medal */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute

                h-24
                w-24

                rounded-full

                bg-[var(--gold)]
                opacity-[0.08]

                blur-2xl

                transition-all
                duration-500

                group-hover:scale-125
                group-hover:opacity-[0.14]
              "
            />

            <div className="relative">
              <CircularProgress
                value={safeProgress}
                mobileSize={86}
                size={86}
                strokeWidth={7}
              />

              {/* Award badge */}

              <div
                className="
                  pointer-events-none
                  absolute

                  -right-1
                  -top-1

                  flex
                  h-6
                  w-6
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[rgba(248,237,203,0.55)]

                  bg-[linear-gradient(
                    135deg,
                    var(--gold),
                    var(--orange)
                  )]

                  text-[var(--brown-900)]

                  shadow-[
                    0_4px_12px_rgba(207,162,71,0.25),
                    0_0_12px_rgba(207,162,71,0.18)
                  ]
                "
              >
                {achieved ? (
                  <Trophy size={11} strokeWidth={2.4} />
                ) : (
                  <Sparkles size={11} strokeWidth={2.4} />
                )}
              </div>
            </div>
          </div>

          {/* Bottom information */}

          <div className="shrink-0 space-y-2">
            {/* Progress line */}

            <div
              className="
                h-1.5
                overflow-hidden
                rounded-full

                border
                border-[rgba(207,162,71,0.08)]

                bg-[var(--stone-200)]

                shadow-[inset_0_1px_3px_rgba(35,23,17,0.10)]
              "
            >
              <div
                className="
                  h-full
                  rounded-full

                  bg-gradient-to-r
                  from-[var(--brown-700)]
                  via-[var(--gold)]
                  to-[var(--orange)]

                  shadow-[
                    0_0_8px_rgba(207,162,71,0.28),
                    inset_0_1px_0_rgba(248,237,203,0.35)
                  ]

                  transition-all
                  duration-700
                  ease-out
                "
                style={{
                  width: `${safeProgress}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[var(--text-secondary)] sm:text-xs">
                <span className="font-semibold text-[var(--text)]">
                  {booksRead}
                </span>{" "}
                / {yearlyGoal} books
              </p>

              {achieved ? (
                <p className="flex items-center gap-1 text-[10px] font-semibold text-[var(--green)] sm:text-xs">
                  <Trophy size={11} />
                  Complete
                </p>
              ) : (
                <p className="text-[10px] font-medium text-[var(--text-secondary)] sm:text-xs">
                  <span className="font-semibold text-[var(--gold)]">
                    {remaining}
                  </span>{" "}
                  left
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ======================= DESKTOP ======================= */}

        <div className="hidden h-full min-h-0 flex-col lg:flex">
          {/* Header */}

          <header className="flex shrink-0 items-center justify-between">
            <div className="flex items-start gap-2.5">
              <div
                className="
                mt-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center

                  rounded-full

                  bg-[var(--gold-light)]

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
                <h2 className=" font-heading text-lg font-semibold text-[var(--text)]">
                  Reading Goal
                </h2>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Your yearly challenge
                </p>
              </div>
            </div>

            <span
              className="
                rounded-full

                border
                border-[rgba(207,162,71,0.15)]

                bg-[var(--gold-light)]

                px-3
                py-1.5

                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]

                text-[var(--gold)]

                shadow-[0_4px_12px_rgba(207,162,71,0.08)]
              "
            >
              2026
            </span>
          </header>

          {/* Hero */}

          <div className="relative flex flex-1 items-center justify-center py-4">
            {/* Large ambient glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute

                h-40
                w-40

                rounded-full

                bg-[radial-gradient(
                  circle,
                  rgba(207,162,71,0.18)_0%,
                  rgba(185,109,69,0.08)_42%,
                  transparent_70%
                )]

                blur-xl

                transition-transform
                duration-700

                group-hover:scale-110
              "
            />

            <div className="relative">
              <CircularProgress
                value={safeProgress}
                size={156}
                strokeWidth={11}
              />

              {/* Premium award badge */}

              <div
                className="
                  absolute
                  -right-2
                  -top-1

                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[rgba(248,237,203,0.65)]

                  bg-[linear-gradient(
                    135deg,
                    var(--gold),
                    var(--orange)
                  )]

                  text-[var(--brown-900)]

                  shadow-[
                    0_8px_18px_rgba(207,162,71,0.24),
                    0_0_18px_rgba(207,162,71,0.16)
                  ]

                  transition-all
                  duration-500

                  group-hover:-translate-y-0.5
                  group-hover:rotate-6
                  group-hover:shadow-[
                    0_10px_22px_rgba(207,162,71,0.30),
                    0_0_22px_rgba(207,162,71,0.22)
                  ]
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

          <div>
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

                <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                  {booksRead}{" "}
                  <span className="font-normal text-[var(--text-secondary)]">
                    / {yearlyGoal} books
                  </span>
                </p>
              </div>

              <div className="h-9 w-px bg-[var(--border)]" />

              <div className="text-right">
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-[var(--text-muted)]
                  "
                >
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

            {/* Progress bar */}

            <div
              className="
                mt-4
                h-2
                overflow-hidden
                rounded-full

                border
                border-[rgba(207,162,71,0.08)]

                bg-[var(--stone-200)]

                shadow-[inset_0_1px_3px_rgba(35,23,17,0.10)]
              "
            >
              <div
                className="
                  relative
                  h-full
                  rounded-full

                  bg-gradient-to-r
                  from-[var(--brown-700)]
                  via-[var(--gold)]
                  to-[var(--orange)]

                  shadow-[
                    0_0_8px_rgba(207,162,71,0.32),
                    0_0_16px_rgba(185,109,69,0.10),
                    inset_0_1px_0_rgba(248,237,203,0.35)
                  ]

                  transition-all
                  duration-700
                  ease-out
                "
                style={{
                  width: `${safeProgress}%`,
                }}
              />
            </div>

            <div className="mt-3">
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
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
