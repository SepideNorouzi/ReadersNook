import { useEffect, useState } from "react";
import { Quote as QuoteIcon, X } from "lucide-react";

import type { QuoteDraft } from "../types/quote";

interface AddQuoteModalProps {
  onClose: () => void;
  onSubmit: (quote: QuoteDraft) => void;
  isSubmitting?: boolean;
}

export default function AddQuoteModal({
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddQuoteModalProps) {
  const [text, setText] = useState("");
  const [page, setPage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isSubmitting]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const trimmed = text.trim();

    if (!trimmed) {
      setError("Enter a quote before saving.");
      return;
    }

    onSubmit({
      text: trimmed,
      page: Number(page) || 0,
    });

    setError("");
  }

  return (
    <div
      className="
        fixed inset-0 z-[200]
        flex items-center justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
      "
      onClick={isSubmitting ? undefined : onClose}
      aria-busy={isSubmitting}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          w-full max-w-md
          rounded-3xl
          bg-white
          p-8
          shadow-2xl
        "
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                bg-[var(--brown-100)]
              "
            >
              <QuoteIcon className="h-4 w-4 text-[var(--brown-700)]" />
            </span>

            <h2 className="text-lg font-semibold text-[var(--brown-900)]">
              Add a Quote
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="
              rounded-full
              p-1
              text-[var(--brown-400)]
              transition-colors
              hover:bg-[var(--brown-100)]
              hover:text-[var(--brown-700)]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Your existing text field */}
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            disabled={isSubmitting}
            placeholder="Write your favorite passage..."
            rows={5}
            className="
              w-full
              rounded-2xl
              border
              border-[var(--brown-200)]
              p-4
              text-sm
              outline-none
              transition
              focus:border-[var(--gold)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          {/* Your existing page field */}
          <input
            value={page}
            onChange={(event) => setPage(event.target.value)}
            disabled={isSubmitting}
            type="number"
            min="0"
            placeholder="Page number"
            className="
              w-full
              rounded-2xl
              border
              border-[var(--brown-200)]
              px-4
              py-3
              text-sm
              outline-none
              focus:border-[var(--gold)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                rounded-full
                bg-[var(--brown-100)]
                px-4 py-2
                text-sm
                text-[var(--brown-700)]
                hover:bg-[var(--brown-200)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                rounded-full
                bg-gradient-to-r
                from-[var(--brown-700)]
                to-[var(--brown-500)]
                px-5 py-2
                text-sm
                font-medium
                text-white
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting ? "Saving..." : "Save Quote"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}