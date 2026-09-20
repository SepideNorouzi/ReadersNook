import { useState } from "react";
import { Library as LibraryIcon } from "lucide-react";

import { useCollections } from "../../hooks/useCollections";
import CollectionModal from "../../modals/CollectionModal";
import CollectionGrid from "../dashboard/collection/CollectionGrid";

export default function LibraryCollections() {
  const { collections, isLoading, isError } = useCollections();
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  const populatedCollections = collections.filter((c) => c.books.length > 0);

  const selectedCollection = selectedCollectionId
    ? (populatedCollections.find((c) => c.id === selectedCollectionId) ?? null)
    : null;

  // Nothing meaningful to show yet, or nothing to show at all — skip the section
  // entirely rather than rendering an empty-state box above the actual books.
  if (isLoading || isError || populatedCollections.length === 0) {
    return null;
  }

  return (
    <>
      <section
        className="
         rounded-[22px] sm:rounded-[28px]
        border border-[rgba(164,125,93,0.28)]
        bg-gradient-to-br from-[var(--brown-200)] via-[var(--brown-100)] to-[var(--brown-300)]
          sm:p-4
          p-3
        "
      >
        <header className="mb-2 flex items-center gap-2 px-1">
          <LibraryIcon size={15} className="text-[var(--gold)]" />
          <h2 className="font-heading text-[15px] font-semibold text-[var(--text)] sm:text-base">
            Your Collections
          </h2>
        </header>

        <CollectionGrid
          collections={populatedCollections}
          onCollectionClick={(collection) =>
            setSelectedCollectionId(collection.id)
          }
          variant="shelf"
        />
      </section>

      {selectedCollection && (
        <CollectionModal
          key={selectedCollection.id}
          collection={selectedCollection}
          onClose={() => setSelectedCollectionId(null)}
        />
      )}
    </>
  );
}
