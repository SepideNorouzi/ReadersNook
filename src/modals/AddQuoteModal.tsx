// AddQuoteModal.tsx
import { useEffect, useState } from "react";
import { X, Quote as QuoteIcon } from "lucide-react";
import type { Quote } from "../types/quote";

interface AddQuoteModalProps {
  onClose: () => void;
  onSubmit: (quote: Quote) => void;
}

export default function AddQuoteModal({
  onClose,
  onSubmit,
}: AddQuoteModalProps) {
  const [text, setText] = useState("");
  const [page, setPage] = useState("");
  const [error, setError] = useState("");

  // Close on Escape — a small a11y win that's easy to forget on custom modals.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) {
      setError("Enter a quote before saving.");
      return;
    }

    onSubmit({
      id: crypto.randomUUID(),
      text: trimmed,
      page: Number(page),
      favorite: false,
      createdAt: new Date().toISOString(),
    });

    setText("");
    setPage("");
    setError("");
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-200
        flex
        items-center
        justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        // Stop the click from bubbling to the overlay above and closing the modal
        onClick={(event) => event.stopPropagation()}
        className="
          w-full
          max-w-md
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
                flex
                h-9
                w-9
                items-center
                justify-center
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
            onClick={onClose}
            aria-label="Close"
            className="
              rounded-full
              p-1
              text-[var(--brown-400)]
              hover:bg-[var(--brown-100)]
              hover:text-[var(--brown-700)]
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="quote-text"
              className="text-sm font-medium text-[var(--brown-700)]"
            >
              Quote
            </label>
            <textarea
              id="quote-text"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                if (error) setError("");
              }}
              rows={4}
              autoFocus
              placeholder="Type or paste the quote..."
              className="
                mt-2
                w-full
                resize-none
                rounded-2xl
                border
                border-[var(--brown-200)]
                bg-[var(--stone-50)]
                p-3
                text-sm
                text-[var(--brown-900)]
                outline-none
                focus:border-[var(--gold)]
              "
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <div>
            <label
              htmlFor="quote-page"
              className="text-sm font-medium text-[var(--brown-700)] px-3"
            >
              Page
            </label>
            <input
              id="quote-page"
              type="number"
              min={1}
              value={page}
              onChange={(event) => setPage(event.target.value)}
              placeholder="e.g. 214"
              className="
                mt-2
                w-28
                rounded-full
                border
                border-[var(--brown-200)]
                bg-[var(--stone-50)]
                px-4
                py-2
                text-sm
                text-[var(--brown-900)]
                outline-none
                focus:border-[var(--gold)]
              "
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-full
                bg-[var(--brown-100)]
                px-4
                py-2
                text-sm
                text-[var(--brown-700)]
                hover:bg-[var(--brown-200)]
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                rounded-full
                bg-gradient-to-r
                from-[var(--brown-700)]
                to-[var(--brown-500)]
                px-5
                py-2
                text-sm
                font-medium
                text-white
                hover:opacity-90
              "
            >
              Save Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
