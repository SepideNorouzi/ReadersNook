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
  const [rawValue, setRawValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => onSearch(rawValue), delay);
    return () => clearTimeout(timeoutId);
  }, [rawValue, delay, onSearch]);

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-[20px]
        border border-[var(--brown-200)]
        bg-[var(--surface)]
        shadow-[0_8px_24px_rgba(72,45,30,0.07)]
        transition-all duration-300
        focus-within:border-[var(--brown-400)]
        focus-within:shadow-[0_12px_32px_rgba(72,45,30,0.11)]
      "
    >
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r
          from-[var(--orange)]/[0.04]
          via-transparent
          to-[var(--gold)]/[0.07]
        "
      />

      <SearchIcon
        size={19}
        className="
          pointer-events-none
          absolute left-4 top-1/2 -translate-y-1/2
          text-[var(--brown-500)]
          transition-colors
          group-focus-within:text-[var(--orange)]
        "
      />

      <input
        type="text"
        value={rawValue}
        onChange={(e) => setRawValue(e.target.value)}
        placeholder="Search books, authors..."
        autoFocus={autoFocus}
        className="
          w-full bg-transparent
          py-3.5 pl-11 pr-11
          text-sm text-[var(--text)]
          outline-none
          placeholder:text-[var(--text-muted)]
          sm:py-4
        "
      />

      {rawValue && (
        <button
          type="button"
          onClick={() => setRawValue("")}
          aria-label="Clear search"
          className="
            absolute right-3 top-1/2
            flex h-7 w-7 -translate-y-1/2
            items-center justify-center
            rounded-full
            text-[var(--text-muted)]
            transition-all
            hover:bg-[var(--stone-100)]
            hover:text-[var(--text)]
          "
        >
          <X size={14} />
        </button>
      )}

      <div
        className="
          pointer-events-none absolute bottom-0 left-1/2 h-px w-0
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent via-[var(--orange)] to-transparent
          transition-all duration-500
          group-focus-within:w-1/3
        "
      />
    </div>
  );
}