import { useState } from "react";
import { Library } from "lucide-react";
import Card from "../../../components/ui/Card";
import CollectionGrid from "./CollectionGrid";
import CollectionModal from "../../../modals/CollectionModal";
import { useCollections } from "../../../hooks/useCollections";
import type { CollectionWithBooks } from "../../../types/collection";

interface Props {
  className?: string;
}

export default function CollectionsCard({ className }: Props) {
  const { collections, isLoading } = useCollections();

  const [selectedCollection, setSelectedCollection] =
    useState<CollectionWithBooks | null>(null);

  if (isLoading) {
    return (
      <Card
        className={`flex h-full items-center justify-center ${className ?? ""}`}
      >
        <p className="text-sm text-[var(--text-secondary)]">Loading...</p>
      </Card>
    );
  }

  return (
    <>
      <Card
        className={`
        flex
        h-full
        flex-col

        rounded-[28px]

        border
        border-[var(--border)]

        bg-gradient-to-b
        from-white
        to-[var(--surface-hover)]

        p-2
        lg:p-6

        ${className ?? ""}
      `}
      >
        <div className="mb-2 flex items-center justify-between lg:mb-3">
          <div className="flex items-center gap-2">
            <Library size={14} className="text-[var(--brown-700)] lg:size-4" />
            <h2 className="font-heading text-[12px] font-semibold text-[var(--text)] lg:text-lg">
              Collections
            </h2>
          </div>

          <span className="rounded-full bg-[var(--stone-200)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)] lg:px-2.5 lg:py-1 lg:text-[11px]">
            {collections.length}
          </span>
        </div>

        {collections.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <Library
              size={26}
              className="mb-2 text-[var(--stone-300)] lg:mb-3 lg:size-[34px]"
            />
            <p className="text-center text-xs text-[var(--text-secondary)] lg:text-sm">
              No collections yet.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-hidden">
            <CollectionGrid
              collections={collections}
              onCollectionClick={setSelectedCollection}
            />
          </div>
        )}
      </Card>
      {selectedCollection && (
        <CollectionModal
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
        />
      )}
    </>
  );
}
