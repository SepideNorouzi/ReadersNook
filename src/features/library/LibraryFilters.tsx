// src/features/Library/LibraryFilters.tsx
import { filterOptions } from "./statusConfig";
import type { BookStatus } from "../../types/book";

type Props = {
  active: BookStatus | "all";
  onChange: (value: BookStatus | "all") => void;
  counts: Record<BookStatus | "all", number>;
};

export default function LibraryFilters({ active, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(value)}
            className={`
              flex items-center gap-2 rounded-full px-4 py-2
              text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-gradient-to-r from-[var(--brown-900)] to-[var(--brown-800)] text-white shadow-[var(--shadow)]"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--brown-400)]"
              }
            `}
          >
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
