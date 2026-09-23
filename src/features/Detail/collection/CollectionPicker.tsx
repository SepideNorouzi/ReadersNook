import { useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";

import type { Book } from "../../../types/book";

import { useIsOwnedLibraryBook } from "../../../hooks/useBooks";
import { useCollections } from "../../../hooks/useCollections";

interface Props {
  book: Book;
}

export default function CollectionPicker({ book }: Props) {
  const isSavedBook = useIsOwnedLibraryBook(book);

  const {
    collections,
    isLoading,
    createCollection,
    addBookToCollection,
    removeBookFromCollection,
    isCreating,
    isAddingBook,
    isRemovingBook,
  } = useCollections();

  const [open, setOpen] = useState(false);

  const [creating, setCreating] = useState(false);

  const [name, setName] = useState("");

  const [busyId, setBusyId] = useState<string | null>(null);

  /*
   * Collections are attached to the backend catalog book.
   *
   * IMPORTANT:
   * book.id = library-entry id
   * book.catalogId = catalog/database book id
   *
   * Collection membership uses the catalog/database id.
   */
  const catalogBookId = book.catalogId;

  function isInCollection(collectionId: string) {
    if (!catalogBookId) {
      return false;
    }

    const collection = collections.find((item) => item.id === collectionId);

    if (!collection) {
      return false;
    }

    return collection.books.some(
      (collectionBook) =>
        String(collectionBook.catalogId ?? collectionBook.id) ===
        String(catalogBookId),
    );
  }

  async function handleToggle(collectionId: string) {
    /*
     * A collection membership request needs
     * the catalog/database book id.
     */
    if (!isSavedBook || !catalogBookId) {
      return;
    }

    const alreadyIn = isInCollection(collectionId);

    try {
      setBusyId(collectionId);

      if (alreadyIn) {
        await removeBookFromCollection({
          collectionId,
          catalogBookId,
        });
      } else {
        await addBookToCollection({
          collectionId,
          catalogBookId,
        });

        /*
         * Adding a book closes the menu.
         * Removing keeps it open so the user can
         * continue editing collection membership.
         */
        setOpen(false);
      }
    } catch (error) {
      console.error(
        `Failed to ${alreadyIn ? "remove from" : "add to"} collection:`,
        error,
      );
    } finally {
      setBusyId(null);
    }
  }

  async function handleCreate() {
    if (!isSavedBook || !catalogBookId) {
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    try {
      /*
       * First create the collection.
       */
      const collection = await createCollection(trimmedName);

      /*
       * Then add THIS catalog book to
       * the newly-created collection.
       */
      await addBookToCollection({
        collectionId: collection.id,
        catalogBookId,
      });

      setName("");
      setCreating(false);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create collection:", error);
    }
  }

  const hasAnyMutation = isAddingBook || isRemovingBook;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={!isSavedBook || !catalogBookId}
        aria-expanded={open}
        aria-haspopup="menu"
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
          disabled:cursor-not-allowed
          disabled:opacity-50
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
          role="menu"
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

                    const busy = hasAnyMutation && busyId === collection.id;

                    return (
                      <button
                        key={collection.id}
                        type="button"
                        role="menuitemcheckbox"
                        aria-checked={selected}
                        disabled={hasAnyMutation}
                        onClick={() => handleToggle(collection.id)}
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
                            disabled:cursor-not-allowed
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

                        {selected && !busy && (
                          <Check size={16} className="text-green-600" />
                        )}

                        {busy && (
                          <span className="text-xs text-stone-400">
                            {selected ? "Removing..." : "Adding..."}
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
                  disabled={hasAnyMutation}
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
                    disabled:cursor-not-allowed
                    disabled:opacity-50
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
                disabled={isCreating || isAddingBook}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCreating(false);
                    setName("");
                  }}
                  disabled={isCreating || isAddingBook}
                  className="
                    rounded-full
                    px-3
                    py-1.5
                    text-xs
                    text-stone-500
                    hover:bg-stone-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={
                    !name.trim() || isCreating || isAddingBook || !catalogBookId
                  }
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
                  {isCreating || isAddingBook ? "Creating..." : "Create & add"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
