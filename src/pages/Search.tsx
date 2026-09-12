import { Sparkles } from "lucide-react";
import { useCallback, useState } from "react";

import SearchBar from "../features/searchBooks/SearchBar";
import SearchResults from "../features/searchBooks/SearchResults";

export default function Search() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  }, []); // setQuery/setPage are stable across renders.

  return (
    <main className="flex flex-col gap-7 p-4 pt-20 sm:p-6 lg:p-12 lg:pt-20">
      <div
        aria-hidden="true"
        className="
    pointer-events-none
    absolute inset-x-0 top-0
    z-0
    h-24
    bg-gradient-to-b
    from-[rgba(35,23,17,0.10)]
    via-[rgba(35,23,17,0.04)]
    to-transparent
    md:hidden
  "
      />
      <section className="mx-auto w-full max-w-4xl">
        <div className="mb-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold)]">
              <Sparkles size={14} />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brown-600)]">
              Discover
            </span>
          </div>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Search by title, author, or whatever book has taken over your brain
            lately.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <SearchResults query={query} page={page} onPageChange={setPage} />
      </section>
    </main>
  );
}
