
import type { BookStatus } from "../../types/book";
import { STATUS_OPTIONS } from "../Detail/hero/statusOptions";

type Props = {
  active: BookStatus | "all";
  onChange: (value: BookStatus | "all") => void;
  counts: Record<BookStatus | "all", number>;
};

const FILTERS: { value: BookStatus | "all"; label: string; dot: string }[] = [
  { value: "all", label: "All Books", dot: "bg-[var(--stone-400)]" },
  ...STATUS_OPTIONS,
];

export default function LibraryFilters({
  active,
  onChange,
  counts,
}: Props) {
  return (
    <div
      className="
        flex
        gap-1.5
        overflow-x-auto
        px-1
        py-0.5
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        sm:justify-center
        sm:gap-2
        sm:overflow-visible
      "
    >
      {FILTERS.map(({ value, label, dot }) => {
        const isActive = active === value;

        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(value)}
            className={`
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              px-3
              py-1.5
              text-[11px]
              font-medium
              transition-all
              duration-200

              sm:px-3.5
              sm:py-2
              sm:text-sm

              ${
                isActive
                  ? `
                    bg-gradient-to-r
                    from-[var(--brown-900)]
                    to-[var(--brown-800)]
                    text-white
                    shadow-[0_5px_14px_rgba(72,45,30,0.18)]
                  `
                  : `
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--text-secondary)]
                    hover:border-[var(--brown-300)]
                    hover:bg-[var(--brown-50)]
                    hover:text-[var(--brown-800)]
                  `
              }
            `}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${dot} sm:h-2 sm:w-2`} />

            <span>{label}</span>

            <span
              className={`
                rounded-full
                px-1.5
                py-0.5
                text-[9px]
                font-semibold
                sm:px-2
                sm:text-[10px]
                ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-[var(--stone-100)] text-[var(--text-muted)]"
                }
              `}
            >
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

