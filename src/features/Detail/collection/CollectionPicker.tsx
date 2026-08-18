import { useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import type { Book } from "../../../types/book";
import { useCollections } from "../../../hooks/useCollections";

interface Props {
  book: Book;
}

export default function CollectionPicker({ book }: Props) {
  const { collections, isLoading, createCollection, addBookToCollection } =
    useCollections();

  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);

  const isInCollection = (collectionId: number) => {
    const collection = collections.find(
      (collection) => collection.id === collectionId,
    );

    return collection?.books.some(
      (collectionBook) => collectionBook.id === book.id,
    );
  };

  async function handleAdd(collectionId: number) {
    if (isInCollection(collectionId)) {
      setOpen(false);
      return;
    }

    try {
      setBusyId(collectionId);

      await addBookToCollection({
        collectionId,
        bookId: book.id,
      });

      setOpen(false);
    } finally {
      setBusyId(null);
    }
  }

  async function handleCreate() {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    try {
      const collection = await createCollection(trimmedName);

      await addBookToCollection({
        collectionId: collection.id,
        bookId: book.id,
      });

      setName("");
      setCreating(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-[#E7DED5]
          bg-[#FBF8F4]
          px-3.5
          py-1.5
          text-sm
          shadow-sm
          transition-all
          hover:border-[#C9B39A]
          hover:bg-white
        "
      >
        <span className="text-stone-600">Add to collection</span>

        <ChevronDown
          className={`
            h-3.5
            w-3.5
            text-stone-500
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-64
            overflow-hidden
            rounded-2xl
            border
            border-stone-200
            bg-white
            shadow-xl
          "
        >
          {!creating ? (
            <>
              <div className="max-h-64 overflow-y-auto py-1">
                {isLoading ? (
                  <p className="px-4 py-3 text-sm text-stone-500">
                    Loading collections...
                  </p>
                ) : collections.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-stone-500">
                    No collections yet.
                  </p>
                ) : (
                  collections.map((collection) => {
                    const selected = isInCollection(collection.id);
                    const busy = busyId === collection.id;

                    return (
                      <button
                        key={collection.id}
                        type="button"
                        disabled={busy}
                        onClick={() => handleAdd(collection.id)}
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-3
                          px-4
                          py-3
                          text-left
                          text-sm
                          transition-colors
                          hover:bg-stone-100
                          disabled:opacity-50
                        "
                      >
                        <span
                          className={
                            selected
                              ? "font-semibold text-stone-900"
                              : "text-stone-700"
                          }
                        >
                          {collection.name}
                        </span>

                        {selected && (
                          <Check size={16} className="text-green-600" />
                        )}

                        {busy && (
                          <span className="text-xs text-stone-400">
                            Adding...
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setCreating(true)}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-medium
                    text-stone-700
                    transition-colors
                    hover:bg-stone-100
                  "
                >
                  <Plus size={16} />
                  New collection
                </button>
              </div>
            </>
          ) : (
            <div className="p-4">
              <p className="mb-3 text-sm font-semibold text-stone-800">
                New collection
              </p>

              <input
                autoFocus
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleCreate();
                  }
                }}
                placeholder="Collection name"
                className="
                  w-full
                  rounded-xl
                  border
                  border-stone-200
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-stone-400
                "
              />

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCreating(false);
                    setName("");
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
                  disabled={!name.trim()}
                  onClick={handleCreate}
                  className="
                    rounded-full
                    bg-stone-900
                    px-4
                    py-1.5
                    text-xs
                    font-medium
                    text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Create & add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
