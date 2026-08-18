import { useState } from "react";
import { Library } from "lucide-react";
import Card from "../../../components/ui/Card";
import CollectionGrid from "./CollectionGrid";
import CollectionModal from "../../../modals/CollectionModal";
import { useCollections } from "../../../hooks/useCollections";

interface Props {
  className?: string;
  /** Optional — lets a parent wire this up to whatever opens the
   * "create collection" flow. Button only renders if this is provided. */
  onCreateCollection?: () => void;
}

export default function CollectionsCard({
  className,
  onCreateCollection,
}: Props) {
  const { collections, isLoading } = useCollections();

  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  const selectedCollection = selectedCollectionId
    ? (collections.find((c) => c.id === selectedCollectionId) ?? null)
    : null;

  if (isLoading) {
    return (
      <Card
        className={`flex h-full items-center justify-center ${className ?? ""}`}
      >
        <p className="text-sm text-[var(--text-secondary)]">Loading...</p>
      </Card>
    );
  }

  const hasCollections = collections.length > 0;

  return (
    <>
      <Card
        className={`
          flex
          h-full
          min-h-0
          flex-col

          rounded-[22px]
          sm:rounded-[28px]

          border
          border-[var(--border)]

          bg-gradient-to-b
          from-white
          to-[var(--surface-hover)]

          p-3.5
          sm:p-4
          lg:p-6

          ${className ?? ""}
        `}
      >
        <div className="mb-2.5 flex shrink-0 items-center justify-between sm:mb-3">
          <div className="flex items-center gap-2">
            <Library size={14} className="text-[var(--brown-700)] lg:size-4" />
            <h2 className="font-heading text-sm font-semibold text-[var(--text)] sm:text-[15px] lg:text-lg">
              Collections
            </h2>
          </div>

          {/* Same call as CurrentReadingCard: a "0" pill says nothing useful,
              only show the count once it's worth showing. */}
          {hasCollections && (
            <span
              className="
                rounded-full
                bg-[var(--stone-200)]
                px-2
                py-0.5
                text-[10px]
                font-medium
                text-[var(--text-secondary)]
                sm:px-2.5
                sm:py-1
                sm:text-[11px]
              "
            >
              {collections.length}
            </span>
          )}
        </div>

        {!hasCollections ? (
          /* Empty state — same anatomy as CurrentReadingCard's:
             icon-in-circle, title, description, optional CTA.
             Reuses the same tokens (stone-100 surface, brown-500 accent,
             border/white CTA) so the two cards read as one design system. */
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4 text-center">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-full
                bg-[var(--stone-100)]

                text-[var(--brown-500)]

                lg:h-14
                lg:w-14
              "
            >
              <Library size={18} className="lg:hidden" />
              <Library size={22} className="hidden lg:block" />
            </div>

            <div className="space-y-1">
              <p className="font-heading text-sm font-semibold text-[var(--text)] lg:text-base">
                No collections yet
              </p>
              <p className="mx-auto max-w-[200px] text-xs text-[var(--text-secondary)] lg:text-sm">
                Group your books into shelves like "Favorites" or "2026 Reads."
              </p>
            </div>

            {onCreateCollection && (
              <button
                onClick={onCreateCollection}
                className="
                  mt-1

                  rounded-full
                  border
                  border-[var(--border)]
                  bg-white

                  px-4
                  py-1.5

                  text-xs
                  font-medium
                  text-[var(--text)]

                  transition-all
                  hover:border-[var(--brown-500)]
                  hover:bg-[var(--stone-100)]

                  lg:text-sm
                "
              >
                Create a collection
              </button>
            )}
          </div>
        ) : (
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hidden">
              <CollectionGrid
                collections={collections}
                onCollectionClick={(collection) =>
                  setSelectedCollectionId(collection.id)
                }
              />
            </div>

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                left-0
                right-0
                h-8
                bg-gradient-to-t
                from-white
                to-transparent
              "
            />
          </div>
        )}
      </Card>

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
