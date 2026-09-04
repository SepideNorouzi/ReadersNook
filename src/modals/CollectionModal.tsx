import { useState } from "react";
import { X, Library, Pencil, Trash2, Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

import type { CollectionWithBooks } from "../types/collection";
import Card from "../ui/Card";
import { useCollections } from "../hooks/useCollections";

interface Props {
  collection: CollectionWithBooks;
  onClose: () => void;
}

export default function CollectionModal({ collection, onClose }: Props) {
  const navigate = useNavigate();

  const {
    renameCollection,
    removeBookFromCollection,
    deleteCollection,
    isDeleting,
    isRemovingBook,
    isRenaming,
  } = useCollections();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(collection.name);
  const [draftBooks, setDraftBooks] = useState(collection.books);

  const isSaving = isRenaming || isRemovingBook;
  const hasNameChange = name.trim() !== collection.name;
  const removedBooks = collection.books.filter(
    (book) => !draftBooks.some((draft) => draft.id === book.id),
  );
  const hasChanges = hasNameChange || removedBooks.length > 0;

  function startEditing() {
    setName(collection.name);
    setDraftBooks(collection.books);
    setIsEditing(true);
  }

  function cancelEditing() {
    setName(collection.name);
    setDraftBooks(collection.books);
    setIsEditing(false);
  }

  async function handleSave() {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    try {
      if (hasNameChange) {
        await renameCollection({
          collectionId: collection.id,
          name: trimmedName,
        });
      }

      await Promise.all(
        removedBooks.map((book) =>
          removeBookFromCollection({
            collectionId: collection.id,
            bookId: book.id,
          }),
        ),
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save collection:", error);
    }
  }

  async function handleDeleteCollection() {
    const confirmed = window.confirm(
      `Delete "${collection.name}"? This will permanently remove the collection.`,
    );

    if (!confirmed) return;

    try {
      await deleteCollection(collection.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete collection:", error);
    }
  }

  function handleRemoveBook(bookId: string) {
    setDraftBooks((books) => books.filter((book) => book.id !== bookId));
  }

  const visibleBooks = isEditing ? draftBooks : collection.books;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 p-3
        backdrop-blur-sm
        sm:p-4
      "
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-label={collection.name}
        onClick={(event) => event.stopPropagation()}
        className="
          flex h-[84vh] w-full max-w-[380px] flex-col
          rounded-[1.75rem] border border-[var(--border)]
          bg-gradient-to-b from-white to-[var(--surface-hover)]
          p-4 sm:max-w-[500px] sm:rounded-[2.5rem] sm:p-6
        "
      >
        {/* HEADER */}
        <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <Library
                size={16}
                className="shrink-0 text-[var(--brown-700)] sm:size-[18px]"
              />

              {isEditing ? (
                <input
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSave();
                    if (event.key === "Escape") cancelEditing();
                  }}
                  className="
                    min-w-0 flex-1 rounded-lg
                    border border-[var(--brown-200)]
                    bg-[var(--brown-50)]
                    px-2 py-1
                    text-base font-semibold
                    text-[var(--text)]
                    outline-none
                    focus:border-[var(--gold)]
                    focus:ring-2
                    focus:ring-[rgba(207,162,71,0.12)]
                    sm:text-lg
                  "
                />
              ) : (
                <h2 className="truncate font-heading text-base font-bold text-[var(--text)] sm:text-xl">
                  {collection.name}
                </h2>
              )}

              {/* EDIT BUTTON */}
              {!isEditing && (
                <button
                  type="button"
                  onClick={startEditing}
                  aria-label="Edit collection"
                  className="
                    shrink-0 rounded-full p-1.5
                    text-[var(--text-muted)]
                    transition-all duration-200
                    hover:bg-[var(--gold-light)]
                    hover:text-[var(--brown-700)]
                    hover:scale-105
                  "
                >
                  <Pencil size={13} />
                </button>
              )}
            </div>

            {collection.description && (
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                {collection.description}
              </p>
            )}

            <p className="mt-2 text-xs text-[var(--text-secondary)] sm:mt-3 sm:text-sm">
              {visibleBooks.length}{" "}
              {visibleBooks.length === 1 ? "Book" : "Books"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close collection"
            className="
              shrink-0 rounded-full p-1.5
              transition-all duration-200
              hover:bg-[var(--stone-100)]
              sm:p-2
            "
          >
            <X size={17} className="sm:size-[18px]" />
          </button>
        </div>

        <div className="mb-3 border-b border-[var(--border)] sm:mb-5" />

        {/* BOOKS */}
        <div
          className="
            flex-1 overflow-y-auto pr-1 pt-1
            scrollbar-hidden sm:pr-2
          "
        >
          {visibleBooks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-5 text-center">
              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-full bg-[var(--stone-100)]
                  text-[var(--brown-500)]
                  sm:h-14 sm:w-14
                "
              >
                <Library size={20} />
              </div>

              <h3 className="mt-3 font-heading text-sm font-semibold text-[var(--text)] sm:mt-4 sm:text-base">
                This collection is empty
              </h3>

              <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                Add books from their detail pages to build this collection.
              </p>
            </div>
          ) : (
            <div
              className="
                grid grid-cols-3 gap-x-3 gap-y-5
                sm:grid-cols-4 sm:gap-5
              "
            >
              {visibleBooks.map((book) => (
                <div key={book.id} className="group relative min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (isEditing) return;
                      onClose();
                      navigate(`/book/${book.id}`);
                    }}
                    className="
                      flex w-full flex-col items-center text-center
                    "
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="
                        aspect-[2/3] w-full rounded-lg object-cover
                        shadow-[0_4px_10px_rgba(35,23,17,0.10)]
                        transition-all duration-300
                        group-hover:-translate-y-1
                        group-hover:shadow-[0_8px_16px_rgba(35,23,17,0.14)]
                      "
                    />

                    <p
                      className="
                        mt-1.5 line-clamp-2 text-[10px]
                        font-medium leading-tight text-[var(--text)]
                        sm:mt-2 sm:text-xs
                      "
                    >
                      {book.title}
                    </p>
                  </button>

                  {/* REMOVE BOOK - EDIT MODE ONLY */}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBook(book.id)}
                      aria-label={`Remove ${book.title}`}
                      className="
                        absolute right-1 top-1
                        flex h-7 w-7 items-center justify-center
                        rounded-full
                        border border-red-100
                        bg-white/95
                        text-red-500
                        shadow-[0_4px_12px_rgba(120,30,20,0.10)]
                        transition-all duration-200
                        hover:scale-105
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* EDIT FOOTER */}
        {isEditing && (
          <div className="mt-3 border-t border-[var(--border)] pt-3 sm:mt-5 sm:pt-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={cancelEditing}
                disabled={isSaving || isDeleting}
                className="
                  flex-1 rounded-xl
                  border border-[var(--border)]
                  bg-[var(--surface)]
                  px-4 py-2.5
                  text-xs font-medium
                  text-[var(--text-secondary)]
                  transition-all duration-200
                  hover:bg-[var(--stone-100)]
                  disabled:opacity-40
                  sm:text-sm
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!hasChanges || isSaving || isDeleting}
                className="
                  flex-1 flex items-center justify-center gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[var(--gold)]
                  to-[var(--orange)]
                  px-4 py-2.5
                  text-xs font-semibold
                  text-[var(--brown-900)]
                  shadow-[0_6px_18px_rgba(207,162,71,0.18)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_22px_rgba(207,162,71,0.25)]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:text-sm
                "
              >
                {isSaving ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={14} />
                    Save changes
                  </>
                )}
              </button>
            </div>

            {/* DELETE COLLECTION */}
            <button
              type="button"
              onClick={handleDeleteCollection}
              disabled={isSaving || isDeleting}
              className="
                mt-2.5 flex w-full items-center justify-center gap-2
                rounded-xl
                border border-red-200/80
                bg-red-50/70
                px-4 py-2
                text-[11px] font-semibold text-red-600
                transition-all duration-200
                hover:border-red-300
                hover:bg-red-50
                hover:text-red-700
                disabled:cursor-not-allowed
                disabled:opacity-40
                sm:text-xs
              "
            >
              <Trash2 size={13} />
              {isDeleting ? "Deleting collection..." : "Delete collection"}
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
