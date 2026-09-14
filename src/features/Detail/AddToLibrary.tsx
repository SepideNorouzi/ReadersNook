import { Plus } from "lucide-react";
import type { BookSearchResult } from "../../types/searchResults";
import { useAddToLibrary } from "../../hooks/useBooks";

type Props = { result: BookSearchResult };

export default function AddToLibrary({ result }: Props) {
  const { alreadySaved, isPending, errorMessage, handleAdd } =
    useAddToLibrary(result);

  if (alreadySaved) return null; // nothing to float once it's in the library

  return (
    <div className="fixed inset-x-0 bottom-4 lg:left-100 z-70 flex flex-col items-center gap-2 px-4">
      {errorMessage && (
        <p className="text-xs text-[var(--orange)]">{errorMessage}</p>
      )}
      <button
        type="button"
        onClick={handleAdd}
        disabled={isPending}
        className="
          flex items-center gap-5 rounded-full
          bg-gradient-to-r from-[var(--brown-900)] to-[var(--brown-800)]
          lg:px-6 lg:py-6 px-4 py-4 text-sm font-semibold text-white
          shadow-[0_10px_30px_rgba(72,45,30,0.3)]
          transition-transform hover:-translate-y-0.5
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        <Plus size={16} />
        {isPending ? "Adding..." : ""}
      </button>
    </div>
  );
}
