import { useSearchBooks } from "../../hooks/useSearchBooks";
import SearchResultCard from "./SearchResultCard";
import { BookApiError, type BookSearchResult } from "../../types/searchResults";

type Props = {
  query: string;
};

export default function SearchResults({ query }: Props) {
  const trimmed = query.trim();
  const { data: results, isLoading, isError, error } = useSearchBooks(query);
  const isRateLimited = error instanceof BookApiError && error.status === 429;

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

  // 3. Error — the network call itself failed (bad response, offline, etc).
  // NOTE: `text-red-600` is a plain Tailwind color, not one of your
  // --brown/--stone CSS vars — I don't see a danger/error color defined
  // in what you've shown me. Swap this for a var if you add one, since
  // an undefined var(--something) fails silently (no crash, just no color).
  if (isError) {
    return (
      <p className="text-sm text-red-600">
        {isRateLimited
          ? "The book search service is temporarily rate limited. This isn't specific to you — try again in a moment."
          : "Something went wrong. Please try again."}
      </p>
    );
  }

  // 4. Empty — request succeeded, the search API just has nothing matching.
  if (!results || results.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        No books found for &quot;{trimmed}&quot;.
      </p>
    );
  }

  // 5. Success — the actual results grid.
  // Wider minmax than Library's grid (280px vs 180px) because
  // SearchResultCard is a horizontal cover+body layout, not a
  // vertical cover-on-top card like BookCard.
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} onAdd={handleAdd} />
      ))}
    </div>
  );
}
