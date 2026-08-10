import { useState } from "react";

import SearchBar from "../features/searchBooks/SearchBar";
import SearchResults from "../features/searchBooks/SearchResults";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <main className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-[var(--text)]">
          Search
        </h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Find your next read and add it to your library.
        </p>
      </div>

      <SearchBar onSearch={setQuery} />

      <SearchResults query={query} />
    </main>
  );
}
