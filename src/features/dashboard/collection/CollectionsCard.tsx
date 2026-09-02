import { useState } from "react";
import { Library, Sparkles } from "lucide-react";

import Card from "../../../components/ui/Card";
import CollectionGrid from "./CollectionGrid";
import CollectionModal from "../../../modals/CollectionModal";
import { useCollections } from "../../../hooks/useCollections";

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
          relative
          isolate

          flex
          h-full
          items-center
          justify-center
          overflow-hidden

          rounded-[22px]
          sm:rounded-[28px]

          border
          border-[rgba(207,162,71,0.16)]

          bg-[linear-gradient(
            145deg,
            var(--surface)_0%,
            var(--bg-secondary)_55%,
            var(--surface-hover)_100%
          )]

          shadow-[var(--shadow-premium)]

          ${className ?? ""}
        `}
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            bg-[
              radial-gradient(
                circle_at_100%_0%,
                rgba(207,162,71,0.12),
                transparent_30%
              ),
              radial-gradient(
                circle_at_0%_100%,
                rgba(185,109,69,0.08),
                transparent_28%
              )
            ]
          "
        />

        <p className="relative z-10 text-sm text-[var(--text-secondary)]">
          Loading...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card
        className={`
          flex
          h-full
          items-center
          justify-center

          rounded-[22px]
          sm:rounded-[28px]

          ${className ?? ""}
        `}
      >
        <p className="text-sm text-red-600">
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
          group
          relative
          isolate

          flex
          h-full
          min-h-0
          flex-col
          overflow-hidden

          rounded-[22px]
          sm:rounded-[28px]

          border
          border-[rgba(207,162,71,0.18)]

          bg-[linear-gradient(
            145deg,
            var(--surface)_0%,
            var(--surface-hover)_52%,
            var(--bg-secondary)_100%
          )]

          p-3.5
          sm:p-4
          lg:p-6

          shadow-[var(--shadow-premium)]

          transition-all
          duration-500
          ease-out

          hover:-translate-y-1
          hover:border-[rgba(207,162,71,0.30)]
          hover:shadow-[var(--shadow-premium-hover)]

          ${className ?? ""}
        `}
      >
        {/* ================= AMBIENT LIGHT ================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-0

            bg-[
              radial-gradient(
                circle_at_100%_0%,
                rgba(207,162,71,0.13),
                transparent_28%
              ),
              radial-gradient(
                circle_at_0%_100%,
                rgba(185,109,69,0.08),
                transparent_27%
              ),
              linear-gradient(
                145deg,
                rgba(255,255,255,0.04),
                transparent_36%,
                transparent_72%,
                rgba(35,23,17,0.04)
              )
            ]

            transition-all
            duration-700

            group-hover:scale-105
          "
        />

        {/* Fine inner edge */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[1px]
            z-0

            rounded-[inherit]

            border
            border-black/[0.025]

            shadow-[
              inset_0_1px_0_rgba(255,255,255,0.65),
              inset_0_-1px_0_rgba(35,23,17,0.04)
            ]
          "
        />

        {/* Top accent */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[14%]
            right-[14%]
            top-0
            z-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-[rgba(207,162,71,0.45)]
            to-transparent

            opacity-70

            transition-all
            duration-500

            group-hover:left-[8%]
            group-hover:right-[8%]
            group-hover:opacity-100
          "
        />

        {/* ================= CONTENT ================= */}

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          {/* ================= HEADER ================= */}

          <div className=" flex shrink-0 items-center justify-between ">
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  bg-[var(--gold-light)]

                  shadow-[0_0_14px_rgba(207,162,71,0.10)]

                  lg:h-8
                  lg:w-8
                "
              >
                <Library
                  size={13}
                  strokeWidth={2.2}
                  className="
                    text-[var(--gold)]

                    transition-all
                    duration-300

                    group-hover:drop-shadow-[0_0_7px_rgba(207,162,71,0.35)]

                    lg:size-4
                  "
                />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    truncate
                    font-heading
                    text-sm
                    font-semibold
                    text-[var(--text)]

                    sm:text-[15px]
                    lg:text-lg
                  "
                >
                  Collections
                </h2>
              </div>
            </div>

            {hasCollections && (
              <div className="flex items-center gap-1.5">
                <Sparkles
                  size={11}
                  className="
                    hidden
                    text-[var(--gold)]
                    opacity-60

                    lg:block
                  "
                />

                <span
                  className="
                    rounded-full

                    border
                    border-[rgba(207,162,71,0.13)]

                    bg-[var(--gold-light)]

                    px-2
                    py-0.5

                    text-[10px]
                    font-semibold
                    text-[var(--gold)]

                    shadow-[0_3px_10px_rgba(207,162,71,0.06)]

                    sm:px-2.5
                    sm:py-1
                    sm:text-[11px]
                  "
                >
                  {collections.length}
                </span>
              </div>
            )}
          </div>

          {/* ================= BODY ================= */}

          {!hasCollections ? (
            <div
              className="
                flex
                flex-1
                flex-col
                items-center
                justify-center
                gap-3
                py-4
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

                  rounded-2xl

                  border
                  border-[rgba(207,162,71,0.12)]

                  bg-[var(--bg-secondary)]

                  text-[var(--brown-500)]

                  shadow-[
                    inset_0_1px_0_rgba(255,255,255,0.55),
                    0_8px_20px_rgba(35,23,17,0.06),
                    0_0_18px_rgba(207,162,71,0.05)
                  ]

                  lg:h-14
                  lg:w-14
                "
              >
                <Library size={20} />
              </div>

              <div className="space-y-1">
                <p
                  className="
                    font-heading
                    text-sm
                    font-semibold
                    text-[var(--text)]

                    lg:text-base
                  "
                >
                  No collections yet
                </p>

                <p
                  className="
                    mx-auto
                    max-w-[220px]
                    text-xs
                    leading-relaxed
                    text-[var(--text-secondary)]

                    lg:text-sm
                  "
                >
                  Group your books into beautiful shelves.
                </p>
              </div>

              {onCreateCollection && (
                <button
                  type="button"
                  onClick={onCreateCollection}
                  className="
                    mt-1

                    rounded-full

                    bg-gradient-to-r
                    from-[var(--gold)]
                    to-[var(--orange)]

                    px-4
                    py-1.5

                    text-xs
                    font-medium
                    text-[var(--brown-900)]

                    shadow-[0_6px_18px_rgba(207,162,71,0.15)]

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:brightness-105
                    hover:shadow-[0_8px_24px_rgba(207,162,71,0.22)]

                    lg:text-sm
                  "
                >
                  Create a collection
                </button>
              )}
            </div>
          ) : (
            /*
             * The collection rail now lives directly inside the
             * main card. There is no nested visual container.
             */
            <div
              className="
                relative
                min-h-0
                flex-1

                -mx-3.5
                sm:-mx-4
                lg:-mx-6
              "
            >
              <div
                className="
                  h-full
                  overflow-x-auto
                  overflow-y-hidden

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-[var(--gold)]/45

                  hover:scrollbar-thumb-[var(--gold)]/70

                  snap-x
                  snap-mandatory
                "
              >
                <CollectionGrid
                  collections={collections}
                  onCollectionClick={(collection) =>
                    setSelectedCollectionId(collection.id)
                  }
                />
              </div>

              {/* Left fade */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-0
                  top-0
                  z-20

                  w-5

                  bg-gradient-to-r
                  from-[var(--surface)]
                  to-transparent

                  opacity-80
                "
              />

              {/* Right fade */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  right-0
                  top-0
                  z-20

                  w-10

                  bg-gradient-to-l
                  from-[var(--surface)]
                  via-[var(--surface)]/40
                  to-transparent

                  opacity-90
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