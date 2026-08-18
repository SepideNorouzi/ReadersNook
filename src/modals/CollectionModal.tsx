import { useState } from "react";
import { X, Library, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

import type { CollectionWithBooks } from "../types/collection";
import Card from "../components/ui/Card";
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
    isRemovingBook,
    isRenaming,
  } = useCollections();

  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(collection.name);

  async function handleRename() {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    await renameCollection({
      collectionId: collection.id,
      name: trimmedName,
    });

    setEditingName(false);
  }

  async function handleRemove(bookId: string) {
    await removeBookFromCollection({
      collectionId: collection.id,
      bookId,
    });
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
        p-4
        backdrop-blur-sm
      "
    >
      <Card
        onClick={(event) => event.stopPropagation()}
        className="
          flex
          h-[80vh]
          w-full
          max-w-[380px]
          sm:max-w-[500px]

          flex-col

          rounded-[2.5rem]

          border
          border-[var(--border)]

          bg-gradient-to-b
          from-white
          to-[var(--surface-hover)]

          p-6
        "
      >
        {/* HEADER */}

        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Library size={18} className="shrink-0 text-[var(--brown-700)]" />

              {!editingName ? (
                <h2 className="truncate font-heading text-xl font-bold text-[var(--text)]">
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
                    text-lg
                    font-semibold
                    outline-none
                    focus:border-stone-500
                  "
                />
              )}

              {!editingName && (
                <button
                  type="button"
                  onClick={() => setEditingName(true)}
                  className="
                    rounded-full
                    p-1.5
                    text-stone-400
                    hover:bg-stone-100
                    hover:text-stone-700
                  "
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>

            {collection.description && (
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {collection.description}
              </p>
            )}

            <p className="mt-3 text-sm text-[var(--text-secondary)]">
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
              p-2
              transition
              hover:bg-[var(--stone-100)]
            "
          >
            <X size={18} />
          </button>
        </div>

        {editingName && (
          <div className="mb-4 flex justify-end gap-2">
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
                text-xs
                text-stone-500
                hover:bg-stone-100
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
                text-xs
                font-medium
                text-white
                disabled:opacity-40
              "
            >
              {isRenaming ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        <div className="mb-5 border-b border-[var(--border)]" />

        {/* BOOKS */}

        <div
          className="
            flex-1
            overflow-y-auto
            pr-2
            pt-1
            scrollbar-hidden
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
                px-6
                text-center
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--stone-100)]
                  text-[var(--brown-500)]
                "
              >
                <Library size={22} />
              </div>

              <h3 className="mt-4 font-heading text-base font-semibold text-[var(--text)]">
                This collection is empty
              </h3>

              <p className="mt-1 max-w-[240px] text-sm text-[var(--text-secondary)]">
                Add books from their detail pages to build this collection.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-3
                gap-4
                sm:gap-5
              "
            >
              {collection.books.map((book) => (
                <div key={book.id} className="group relative">
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
                        rounded-xl
                        object-cover
                        shadow-md
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:shadow-xl
                      "
                    />

                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-xs
                        font-medium
                        text-[var(--text)]
                      "
                    >
                      {book.title}
                    </p>
                  </button>

                  {/* REMOVE */}

                  <button
                    type="button"
                    disabled={isRemovingBook}
                    onClick={() => handleRemove(book.id)}
                    className="
                      absolute
                      right-1
                      top-1
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      text-stone-500
                      opacity-0
                      shadow-md
                      transition-all
                      group-hover:opacity-100
                      hover:bg-red-50
                      hover:text-red-600
                      disabled:opacity-40
                    "
                    aria-label={`Remove ${book.title}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
