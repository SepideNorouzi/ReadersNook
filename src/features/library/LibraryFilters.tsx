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

export default function LibraryFilters({ active, onChange, counts }: Props) {
  return (
    // No `flex-wrap` in the base classes => flexbox defaults to nowrap, so this
    // scrolls horizontally as one row on mobile instead of wrapping to multiple rows.
    // sm: restores the original wrap/no-scroll behavior once there's enough width.
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0">
      {FILTERS.map(({ value, label, dot }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(value)}
            className={`
              flex shrink-0 items-center gap-2 rounded-full px-4 py-2
              text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-gradient-to-r from-[var(--brown-900)] to-[var(--brown-800)] text-white shadow-[var(--shadow)]"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--brown-400)]"
              }
            `}
          >
            <span className={`h-2 w-2 rounded-full ${dot}`} />
            {label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                isActive
                  ? "bg-white/20"
                  : "bg-[var(--stone-200)] text-[var(--text-muted)]"
              }`}
            >
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}