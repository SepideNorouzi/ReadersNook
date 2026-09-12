import { useSearchBooks } from "../../hooks/useSearchBooks";
import SearchResultCard from "./SearchResultCard";
import { ApiError } from "../../lib/apiClient";
type Props = {
  query: string;
  page: number;
  onPageChange: (page: number) => void;
};

export default function SearchResults({ query, page, onPageChange }: Props) {
  const trimmed = query.trim();
  const { data, isLoading, isError, error, isFetching } = useSearchBooks(
    query,
    page,
  );

  const isRateLimited = error instanceof ApiError && error.status === 429;

  const results = data?.results ?? [];
  const hasMore = data?.hasMore ?? false;

  if (!trimmed) {
    return (
      <div
        className="
          flex min-h-40
          items-center justify-center
          rounded-[22px]
          border border-dashed
          border-[var(--brown-200)]
          bg-[var(--surface)]/60
          px-6
          text-center
        "
      >
        <div>
          <p className="text-sm font-medium text-[var(--text)]">
            Start exploring
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Search for a title or author to discover new books.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <p className="px-1 text-xs text-[var(--text-muted)]">
        Searching for &quot;{trimmed}&quot;...
      </p>
    );
  }

  if (isError) {
    return (
      <div
        className="
          rounded-[18px]
          border border-[var(--orange)]/20
          bg-[var(--orange)]/5
          px-4 py-3
        "
      >
        <p className="text-xs text-[var(--orange)]">
          {isRateLimited
            ? "The search service is temporarily rate limited. Try again in a moment."
            : "Something went wrong while searching. Please try again."}
        </p>
      </div>
    );
  }

  if (!results?.length) {
    return (
      <div
        className="
          flex min-h-32
          items-center justify-center
          rounded-[22px]
          border
          border-[var(--brown-200)]
          bg-[var(--surface)]/70
          px-6
          text-center
        "
      >
        <p className="text-xs text-[var(--text-muted)]">
          No books found for &quot;{trimmed}&quot;.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {results.map((result) => (
          <SearchResultCard key={result.externalId} result={result} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || isFetching}
          className="
            rounded-xl border border-[var(--brown-200)]
            px-4 py-2 text-xs font-semibold
            text-[var(--brown-700)]
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Previous
        </button>

        <span className="text-xs text-[var(--text-muted)]">Page {page}</span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasMore || isFetching}
          className="
            rounded-xl border border-[var(--brown-200)]
            px-4 py-2 text-xs font-semibold
            text-[var(--brown-700)]
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
    </>
  );
}
