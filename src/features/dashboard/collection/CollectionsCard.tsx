import { useState } from "react";
import { Library, Sparkles } from "lucide-react";

import Card from "../../../ui/Card";
import CollectionGrid from "./CollectionGrid";
import CollectionModal from "../../../modals/CollectionModal";
import { useCollections } from "../../../hooks/useCollections";
import Loading from "../../../shared/Loading";

interface Props {
  className?: string;
  onCreateCollection?: () => void;
}

export default function CollectionsCard({
  className,
  onCreateCollection,
}: Props) {
  const { collections, isLoading, isError } = useCollections();

  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  const selectedCollection = selectedCollectionId
    ? (collections.find((c) => c.id === selectedCollectionId) ?? null)
    : null;

  if (isLoading) {
    return (
      <Card
        className={`
          flex h-full items-center justify-center
          rounded-[20px] sm:rounded-[28px]
          border border-[rgba(207,162,71,0.16)]
          bg-gradient-to-br
          from-[var(--surface)]
          via-[var(--bg-secondary)]
          to-[var(--surface-hover)]
          shadow-[var(--shadow-premium)]
          ${className ?? ""}
        `}
      >
        <Loading />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card
        className={`
          flex h-full items-center justify-center
          rounded-[20px] sm:rounded-[28px]
          ${className ?? ""}
        `}
      >
        <p className="px-4 text-center text-xs text-red-600 sm:text-sm">
          Couldn't load your collections. Try refreshing.
        </p>
      </Card>
    );
  }

  const hasCollections = collections.length > 0;

  return (
    <>
      <Card
        className={`
          group relative isolate
          flex h-full min-h-0 flex-col overflow-hidden

          rounded-[20px] sm:rounded-[28px]

          border border-[rgba(207,162,71,0.18)]

          bg-gradient-to-br
          from-[var(--surface)]
          via-[var(--surface-hover)]
          to-[var(--bg-secondary)]

          p-3 sm:p-4 lg:p-6

          shadow-[var(--shadow-premium)]

          transition-all duration-500 ease-out

          hover:-translate-y-1
          hover:border-[rgba(207,162,71,0.30)]
          hover:shadow-[var(--shadow-premium-hover)]

          ${className ?? ""}
        `}
      >
        {/* Soft premium glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            bg-[
              radial-gradient(
                circle_at_100%_0%,
                rgba(207,162,71,0.10),
                transparent_28%
              ),
              radial-gradient(
                circle_at_0%_100%,
                rgba(185,109,69,0.05),
                transparent_26%
              )
            ]
          "
        />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          {/* Header */}
          <header className="mb-2.5 flex shrink-0 items-center justify-between sm:mb-4 lg:mb-5">
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="
                  flex h-7 w-7 shrink-0 items-center justify-center
                  rounded-full
                  bg-[var(--gold-light)]
                  shadow-[0_0_12px_rgba(207,162,71,0.08)]
                  sm:h-8 sm:w-8
                "
              >
                <Library
                  size={13}
                  className="
                    text-[var(--gold)]
                    transition-all duration-300
                    group-hover:drop-shadow-[0_0_7px_rgba(207,162,71,0.35)]
                    sm:size-4
                  "
                />
              </div>

              <div className="min-w-0">
                <h2 className="font-heading text-[13px] font-semibold leading-none text-[var(--text)] sm:text-[15px] lg:text-lg">
                  Collections
                </h2>

                <p className="mt-1 hidden text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)] lg:block">
                  Your personal shelves
                </p>
              </div>
            </div>

            {hasCollections && (
              <div className="flex items-center gap-1.5">
                <Sparkles
                  size={11}
                  className="hidden text-[var(--gold)] opacity-60 lg:block"
                />

                <span
                  className="
                    rounded-full
                    border border-[rgba(207,162,71,0.13)]
                    bg-[var(--gold-light)]
                    px-2 py-0.5
                    text-[9px] font-semibold
                    text-[var(--gold)]
                    sm:px-2.5 sm:py-1 sm:text-[11px]
                  "
                >
                  {collections.length}
                </span>
              </div>
            )}
          </header>

          {/* Content */}
          {!hasCollections ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-2 text-center">
              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-2xl
                  border border-[rgba(207,162,71,0.12)]
                  bg-[var(--bg-secondary)]
                  text-[var(--brown-500)]
                  shadow-[0_8px_20px_rgba(35,23,17,0.05)]
                  sm:h-14 sm:w-14
                "
              >
                <Library size={19} />
              </div>

              <div>
                <p className="font-heading text-[13px] font-semibold text-[var(--text)] sm:text-base">
                  No collections yet
                </p>

                <p className="mx-auto mt-1 max-w-[220px] text-[11px] leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                  Group your books into beautiful shelves.
                </p>
              </div>

              {onCreateCollection && (
                <button
                  type="button"
                  onClick={onCreateCollection}
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-[var(--gold)]
                    to-[var(--orange)]
                    px-3.5 py-1.5
                    text-[11px] font-medium
                    text-[var(--brown-900)]
                    shadow-[0_6px_18px_rgba(207,162,71,0.15)]
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:brightness-105
                    hover:shadow-[0_8px_24px_rgba(207,162,71,0.22)]
                    sm:px-4 sm:text-sm
                  "
                >
                  Create a collection
                </button>
              )}
            </div>
          ) : (
            <div className="relative min-h-0 flex-1">
              <div
                className="
                  h-full
                  overflow-x-auto
                  overflow-y-hidden

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-[var(--gold)]/25
                  hover:scrollbar-thumb-[var(--gold)]/50

                  -mx-1
                  sm:mx-0
                "
              >
                <CollectionGrid
                  collections={collections}
                  onCollectionClick={(collection) =>
                    setSelectedCollectionId(collection.id)
                  }
                />
              </div>

              {/* Very subtle edge fades */}
              <div
                className="
                  pointer-events-none
                  absolute inset-y-0 left-0 z-20
                  w-3
                  bg-gradient-to-r
                  from-[var(--surface)]
                  to-transparent
                  sm:w-5
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute inset-y-0 right-0 z-20
                  w-4
                  bg-gradient-to-l
                  from-[var(--surface)]
                  to-transparent
                  sm:w-6
                "
              />
            </div>
          )}
        </div>
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
