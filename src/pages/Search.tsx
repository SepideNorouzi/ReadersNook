import { Sparkles } from "lucide-react";
import { useState } from "react";

import SearchBar from "../features/searchBooks/SearchBar";
import SearchResults from "../features/searchBooks/SearchResults";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <main className="flex flex-col gap-7 p-4 pt-10 sm:p-6 lg:p-12 lg:pt-10">
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

          <h1 className="font-heading text-2xl font-semibold text-[var(--text)] sm:text-3xl">
            Find your next read
          </h1>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Search by title, author, or whatever book has taken over your
            brain lately.
          </p>
        </div>

        <SearchBar onSearch={setQuery} />
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <SearchResults query={query} />
      </section>
    </main>
  );
}