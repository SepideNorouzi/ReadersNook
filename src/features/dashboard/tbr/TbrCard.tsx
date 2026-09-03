import { BookOpen, SquarePen } from "lucide-react";
import { useNavigate } from "react-router";
import Card from "../../../components/ui/Card";
import { useTBRBooks } from "../../../hooks/useTbr";
import TbrBookGrid from "./TbrBookGrid";
import Loading from "../../../components/Loading";

interface Props {
  className?: string;
}

export default function TBRCard({ className }: Props) {
  const { books, isLoading } = useTBRBooks();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card
        className={`
          relative
          isolate
          flex
          items-center
          justify-center
          overflow-hidden

          rounded-[22px]
          sm:rounded-[28px]

          border
          border-[rgba(207,162,71,0.16)]

          bg-[linear-gradient(145deg,var(--surface)_0%,var(--bg-secondary)_55%,var(--surface-hover)_100%)]

          shadow-[var(--shadow-premium)]

          ${className ?? ""}
        `}
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            bg-[radial-gradient(circle_at_100%_0%,rgba(207,162,71,0.12),transparent_30%),radial-gradient(circle_at_0%_100%,rgba(185,109,69,0.08),transparent_28%)]
          "
        />

        <p className="relative z-10 text-sm text-[var(--text-secondary)]">
          <Loading />
        </p>
      </Card>
    );
  }

  return (
    <Card
      className={`
        group
        relative
        isolate

        flex
        min-h-0
        flex-col
        overflow-hidden

        max-h-[440px]
        sm:max-h-[480px]
        lg:h-full
        lg:max-h-full

        rounded-[22px]
        sm:rounded-[28px]

        border
        border-[rgba(207,162,71,0.18)]

        bg-[linear-gradient(145deg,var(--surface)_0%,var(--surface-hover)_54%,var(--bg-secondary)_100%)]

        shadow-[var(--shadow-premium)]

        transition-all
        duration-500
        ease-out

        hover:-translate-y-1
        hover:border-[rgba(207,162,71,0.30)]
        hover:shadow-[var(--shadow-premium-hover)]

        p-3.5
        sm:p-4
        lg:p-6

        ${className ?? ""}
      `}
    >
      {/* Ambient light */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_100%_0%,rgba(207,162,71,0.13),transparent_28%),radial-gradient(circle_at_0%_100%,rgba(185,109,69,0.08),transparent_26%),linear-gradient(145deg,rgba(255,255,255,0.04),transparent_36%,transparent_72%,rgba(35,23,17,0.04))]

          transition-all
          duration-700

          group-hover:scale-105
        "
      />

      {/* Fine inner frame */}
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

          shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(35,23,17,0.04)]
        "
      />

      {/* Decorative top highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[14%]
          right-[14%]
          top-0
          z-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-[rgba(207,162,71,0.42)]
          to-transparent

          opacity-70

          transition-all
          duration-500

          group-hover:left-[9%]
          group-hover:right-[9%]
          group-hover:opacity-100
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        {/* HEADER */}
        <div className="mb-3 flex shrink-0 items-center justify-between lg:mb-5">
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center

                rounded-full

                bg-[var(--gold-light)]

                shadow-[0_0_14px_rgba(207,162,71,0.10)]

                lg:h-8
                lg:w-8
              "
            >
              <SquarePen
                size={13}
                strokeWidth={2.2}
                className="
                  text-[var(--gold)]

                  transition-all
                  duration-300

                  group-hover:drop-shadow-[0_0_7px_rgba(207,162,71,0.35)]

                  lg:size-4
                "
              />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  font-heading
                  text-sm
                  font-semibold
                  text-[var(--text)]

                  sm:text-[15px]
                  lg:text-lg
                "
              >
                <span className="lg:hidden">To Read</span>
                <span className="hidden lg:inline">To Be Read</span>
              </h2>

              <p
                className="
                  mt-0.5
                  hidden
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-[var(--text-muted)]

                  lg:block
                "
              >
                Your next adventures
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className="
                rounded-full

                border
                border-[rgba(207,162,71,0.13)]

                bg-[var(--gold-light)]

                px-2
                py-0.5

                text-[10px]
                font-semibold
                text-[var(--gold)]

                shadow-[0_3px_10px_rgba(207,162,71,0.06)]

                sm:px-2.5
                sm:py-1
                sm:text-[11px]
              "
            >
              {books.length}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        {books.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-2">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-2xl

                border
                border-[rgba(207,162,71,0.12)]

                bg-[var(--bg-secondary)]

                shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_20px_rgba(35,23,17,0.06),0_0_18px_rgba(207,162,71,0.05)]

                lg:h-16
                lg:w-16
              "
            >
              <BookOpen
                size={25}
                className="
                  text-[var(--stone-300)]

                  lg:size-[34px]
                "
              />
            </div>

            <div>
              <p
                className="
                  text-center
                  text-xs
                  font-medium
                  text-[var(--text)]

                  lg:text-sm
                "
              >
                Your shelf is empty.
              </p>

              <p
                className="
                  mt-1
                  max-w-[220px]
                  text-center
                  text-[11px]
                  leading-relaxed
                  text-[var(--text-muted)]

                  lg:text-xs
                "
              >
                Add a few books you'd love to read.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/search")}
              className="
                rounded-full
                bg-[var(--gold)]

                px-4
                py-1.5

                text-xs
                font-medium
                text-[var(--brown-900)]

                transition-all
                duration-200

                hover:bg-[var(--gold-light)]
                hover:shadow-[0_6px_18px_rgba(207,162,71,0.18)]

                lg:text-sm
              "
            >
              Browse books
            </button>
          </div>
        ) : (
          <div
            className="
              relative
              min-h-0
              flex-1
              overflow-hidden

              rounded-[18px]
              sm:rounded-[20px]

              border
              border-[rgba(207,162,71,0.08)]

              bg-[rgba(255,255,255,0.22)]

              shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(35,23,17,0.025)]

              backdrop-blur-[2px]

              transition-all
              duration-500

              group-hover:border-[rgba(207,162,71,0.14)]
            "
          >
            {/* Inner ambient shelf glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                z-0

                h-24
                w-3/4

                -translate-x-1/2

                rounded-full

                bg-[var(--gold)]
                opacity-[0.035]

                blur-3xl
              "
            />

            {/* Scroll area */}
            <div
              className="
                relative
                z-10

                h-full
                overflow-y-auto
                overflow-x-hidden

                p-2
                pb-4

                scrollbar-hidden

                sm:p-2.5
                sm:pb-5
              "
            >
              <TbrBookGrid books={books} />
            </div>

            {/* Top fade */}
            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                z-20

                h-5

                bg-gradient-to-b
                from-[var(--surface-hover)]
                to-transparent

                opacity-55
              "
            />

            {/* Bottom fade */}
            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                z-20

                h-12

                bg-gradient-to-t
                from-[var(--surface-hover)]
                via-[var(--surface-hover)]/65
                to-transparent

                opacity-95
              "
            />
          </div>
        )}
      </div>
    </Card>
  );
}
