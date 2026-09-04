import { useState } from "react";
import { X, Library, Pencil, Trash2 } from "lucide-react";
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

    // Add these to useCollections if they don't exist yet.
    deleteCollection,
    isDeleting,

    isRemovingBook,
    isRenaming,
  } = useCollections();

  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(collection.name);

  async function handleRename() {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    try {
      await renameCollection({
        collectionId: collection.id,
        name: trimmedName,
      });

      setEditingName(false);
    } catch (error) {
      console.error("Failed to rename collection:", error);
    }
  }

  async function handleRemove(bookId: string) {
    try {
      await removeBookFromCollection({
        collectionId: collection.id,
        bookId,
      });
    } catch (error) {
      console.error("Failed to remove book from collection:", error);
    }
  }

  async function handleDeleteCollection() {
    const confirmed = window.confirm(
      `Delete "${collection.name}"? This will remove the collection.`,
    );

    if (!confirmed) return;

    try {
      await deleteCollection(collection.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete collection:", error);
    }
  }

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/40
        p-3
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
          flex
          h-[84vh]
          w-full
          max-w-[380px]
          sm:max-w-[500px]

          flex-col

          rounded-[1.75rem]
          sm:rounded-[2.5rem]

          border
          border-[var(--border)]

          bg-gradient-to-b
          from-white
          to-[var(--surface-hover)]

          p-4
          sm:p-6
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

              {!editingName ? (
                <h2 className="truncate font-heading text-base font-bold text-[var(--text)] sm:text-xl">
                  {collection.name}
                </h2>
              ) : (
                <input
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleRename();
                    }

                    if (event.key === "Escape") {
                      setEditingName(false);
                      setName(collection.name);
                    }
                  }}
                  className="
                    min-w-0
                    flex-1
                    rounded-lg
                    border
                    border-stone-300
                    px-2
                    py-1
                    text-base
                    font-semibold
                    outline-none
                    focus:border-stone-500
                    sm:text-lg
                  "
                />
              )}

              {!editingName && (
                <button
                  type="button"
                  aria-label="Rename collection"
                  onClick={() => setEditingName(true)}
                  className="
                    shrink-0
                    rounded-full
                    p-1.5
                    text-stone-400
                    transition-colors
                    hover:bg-stone-100
                    hover:text-stone-700
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
              {collection.books.length}{" "}
              {collection.books.length === 1 ? "Book" : "Books"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              shrink-0
              rounded-full
              p-1.5
              transition
              hover:bg-[var(--stone-100)]
              sm:p-2
            "
          >
            <X size={17} className="sm:size-[18px]" />
          </button>
        </div>

        {/* RENAME ACTIONS */}
        {editingName && (
          <div className="mb-3 flex justify-end gap-2 sm:mb-4">
            <button
              type="button"
              onClick={() => {
                setEditingName(false);
                setName(collection.name);
              }}
              className="
                rounded-full
                px-3
                py-1.5
                text-[11px]
                text-stone-500
                hover:bg-stone-100
                sm:text-xs
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!name.trim() || isRenaming}
              onClick={handleRename}
              className="
                rounded-full
                bg-stone-900
                px-4
                py-1.5
                text-[11px]
                font-medium
                text-white
                disabled:opacity-40
                sm:text-xs
              "
            >
              {isRenaming ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        <div className="mb-3 border-b border-[var(--border)] sm:mb-5" />

        {/* BOOKS */}
        <div
          className="
            flex-1
            overflow-y-auto
            pr-1
            pt-1
            scrollbar-hidden
            sm:pr-2
          "
        >
          {collection.books.length === 0 ? (
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                px-5
                text-center
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--stone-100)]
                  text-[var(--brown-500)]
                  sm:h-14
                  sm:w-14
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
                grid
                grid-cols-3
                gap-x-3
                gap-y-5

                sm:grid-cols-4
                sm:gap-5
              "
            >
              {collection.books.map((book) => (
                <div key={book.id} className="group relative min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/book/${book.id}`);
                    }}
                    className="
                      flex
                      w-full
                      flex-col
                      items-center
                      text-center
                    "
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="
                        aspect-[2/3]
                        w-full
                        rounded-lg
                        object-cover

                        shadow-[0_4px_10px_rgba(35,23,17,0.10)]

                        transition-all
                        duration-300

                        group-hover:-translate-y-1
                        group-hover:shadow-[0_8px_16px_rgba(35,23,17,0.14)]
                      "
                    />

                    <p
                      className="
                        mt-1.5
                        line-clamp-2

                        text-[10px]
                        font-medium
                        leading-tight

                        text-[var(--text)]

                        sm:mt-2
                        sm:text-xs
                      "
                    >
                      {book.title}
                    </p>
                  </button>

                  {/* REMOVE BOOK */}
                  <button
                    type="button"
                    disabled={isRemovingBook}
                    onClick={() => handleRemove(book.id)}
                    className="
                      absolute
                      right-1
                      top-1

                      flex
                      h-6
                      w-6
                      items-center
                      justify-center

                      rounded-full
                      bg-white/95
                      text-stone-500
                      opacity-100
                      shadow-md

                      transition-all

                      sm:h-7
                      sm:w-7
                      sm:opacity-0
                      sm:group-hover:opacity-100

                      hover:bg-red-50
                      hover:text-red-600
                      disabled:opacity-40
                    "
                    aria-label={`Remove ${book.title}`}
                  >
                    <Trash2 size={11} className="sm:size-[13px]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-3
            border-t
            border-[var(--border)]
            pt-3

            sm:mt-5
            sm:pt-4
          "
        >
          <button
            type="button"
            onClick={handleDeleteCollection}
            disabled={isDeleting}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-2.5

              text-xs
              font-semibold
              text-red-600

              transition-all

              hover:border-red-300
              hover:bg-red-100

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:text-sm
            "
          >
            <Trash2 size={14} />

            {isDeleting ? "Deleting collection..." : "Delete collection"}
          </button>
        </div>
      </Card>
    </div>
  );
}
