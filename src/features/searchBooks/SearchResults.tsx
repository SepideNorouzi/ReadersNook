import { useSearchBooks } from "../../hooks/useSearchBooks";
import SearchResultCard from "./SearchResultCard";
import type { BookSearchResult } from "../../types/searchResults";

type Props = {
  query: string;
};

export default function SearchResults({ query }: Props) {
  const trimmed = query.trim();
  const { data: results, isLoading, isError } = useSearchBooks(query);

  const handleAdd = (result: BookSearchResult) => {
    // TODO: replace with a real mutation (useAddBookToLibrary) once
    // i build the "add to library" step. For now this just proves
    // the click path works end to end.
    console.log("Add to library:", result.title);
  };

  // 1. Idle — nothing searched yet. This is the resting state of the
  // page on first load, distinct from "searched and found nothing."
  if (!trimmed) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        Start typing to search for a book.
      </p>
    );
  }

  // 2. Loading — a real request is in flight.
  if (isLoading) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        Searching for &quot;{trimmed}&quot;...
      </p>
    );
  }

  // 3. Error — the request failed for some reason (network, Google down, etc).
  if (isError) {
    return (
      <p className="text-sm text-red-600">
        Something went wrong. Please try again.
      </p>
    );
  }

  // 4. Empty — request succeeded, Google just has nothing matching.
  if (!results || results.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        No books found for &quot;{trimmed}&quot;.
      </p>
    );
  }

  // 5. Success — the actual results grid.
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
      {results.map((result) => (
        <SearchResultCard
          key={result.googleId}
          result={result}
          onAdd={handleAdd}
        />
      ))}
    </div>
  );
}
