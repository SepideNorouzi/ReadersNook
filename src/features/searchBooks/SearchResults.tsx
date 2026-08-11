import { useSearchBooks } from "../../hooks/useSearchBooks";
import SearchResultCard from "./SearchResultCard";
import { BookApiError } from "../../types/searchResults";

type Props = {
  query: string;
};

export default function SearchResults({ query }: Props) {
  const trimmed = query.trim();
  const { data: results, isLoading, isError, error } = useSearchBooks(query);
  const isRateLimited = error instanceof BookApiError && error.status === 429;

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

  // 5. Success — the actual results grid. Each card is now fully
  // self-contained: it fetches its own "already saved" state and
  // owns its own add-book mutation. This component's only job is
  // fetching search results and laying the cards out.
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
