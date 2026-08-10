import { useEffect, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";

type Props = {
  onSearch: (query: string) => void;
  delay?: number;
  autoFocus?: boolean;
};

export default function SearchBar({
  onSearch,
  delay = 400,
  autoFocus = true,
}: Props) {
  // Raw, immediate value — updates on every keystroke so the input
  // itself never feels laggy. This never leaves this component as-is.
  const [rawValue, setRawValue] = useState("");

  useEffect(() => {
    // Schedule a call to onSearch, but don't fire it yet.
    const timeoutId = setTimeout(() => {
      onSearch(rawValue);
    }, delay);

    // Cleanup runs BEFORE the next effect execution (or on unmount).
    // Every keystroke re-runs this effect, which means every keystroke
    // cancels the previously scheduled timeout before scheduling a new
    // one. Only the timeout from the *last* keystroke in a burst ever
    // survives long enough to actually fire.
    return () => clearTimeout(timeoutId);
  }, [rawValue, delay, onSearch]);

  return (
    <div className="relative">
      <SearchIcon
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
      />

      <input
        type="text"
        value={rawValue}
        onChange={(e) => setRawValue(e.target.value)}
        placeholder="Search books, authors..."
        autoFocus={autoFocus}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]
          py-3 pl-11 pr-11 text-sm text-[var(--text)]
          placeholder:text-[var(--text-muted)]
          transition-colors focus:border-[var(--brown-400)] focus:outline-none
          focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
      />

      {rawValue && (
        <button
          type="button"
          onClick={() => setRawValue("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]
            transition-colors hover:text-[var(--text)]"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
