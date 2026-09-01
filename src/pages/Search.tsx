import { useState } from "react";

import SearchBar from "../features/searchBooks/SearchBar";
import SearchResults from "../features/searchBooks/SearchResults";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <main className="flex flex-col gap-8 p-8 pt-20 md:pt-20">

      <SearchBar onSearch={setQuery} />

      <SearchResults query={query} />
    </main>
  );
}
