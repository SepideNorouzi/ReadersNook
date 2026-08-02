import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, BookOpen } from "lucide-react";
import type { Book } from "../types/book";
import { useUpdateBook } from "../hooks/useUpdateBook";

interface Props {
  open: boolean;
  book: Book;
  onClose: () => void;
}

export default function BookPagesModal({ open, book, onClose }: Props) {
  const updateBook = useUpdateBook();

  const [page, setPage] = useState(book.currentPage);

  useEffect(() => {
    setPage(book.currentPage);
  }, [book]);

  if (!open) return null;

  function handleSave() {
    const value = Number(page);

    if (Number.isNaN(value)) return;

    if (value < 0 || value > book.totalPages) return;

    updateBook.mutate(
      {
        id: book.id,
        changes: {
          currentPage: value,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  }

  return createPortal(
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/40
        backdrop-blur-sm
        px-6
        py-10
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-md
          max-h-[85vh]
          overflow-y-auto
          rounded-[32px]
          border
          border-stone-200
          bg-[#FCFAF7]
          p-8
          shadow-2xl
        "
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mt-2 font-serif text-3xl text-brown-900">
              Update Page
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-stone-200"
          >
            <X className="h-5 w-5 text-stone-600" />
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-amber-700" />

            <div>
              <p className="font-medium text-stone-800">{book.title}</p>
              <p className="text-sm text-stone-500">
                {book.currentPage} / {book.totalPages} pages
              </p>
            </div>
          </div>

          <div className="mt-8">
            <label htmlFor="page" className="block text-sm font-medium text-stone-700">
              Current Page
            </label>

            <input
              id="page"
              type="number"
              min={0}
              max={book.totalPages}
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-stone-300
                bg-stone-50
                px-4
                py-3
                text-lg
                outline-none
                transition
                focus:border-amber-400
                focus:bg-white
              "
            />

            <p className="mt-2 text-sm text-stone-500">
              Enter a number between <strong>0</strong> and{" "}
              <strong>{book.totalPages}</strong>.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              rounded-full
              border
              border-stone-300
              px-5
              py-2.5
              text-stone-700
              transition
              hover:bg-stone-300
            "
          >
            Cancel
          </button>

          <button
            disabled={updateBook.isPending || page < 0 || page > book.totalPages}
            onClick={handleSave}
            className="
              rounded-full
              bg-[var(--brown-800)]
              px-6
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-[var(--brown-600)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}