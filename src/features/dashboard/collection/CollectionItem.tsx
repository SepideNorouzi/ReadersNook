import CollectionStack from "./CollectionStack";
import type { CollectionWithBooks } from "../../../types/collection";

export interface CollectionCardProps {
  collection: CollectionWithBooks;
  onClick?: (collection: CollectionWithBooks) => void;
  compact?: boolean;
}

export default function CollectionItem({
  collection,
  onClick,
}: CollectionCardProps) {
  const { name, books } = collection;

  return (
    <button
      type="button"
      onClick={() => onClick?.(collection)}
      className="
        group

        flex
        w-full
        flex-col
        items-center
        text-center

        snap-start

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        active:scale-[0.98]
      "
    >
      {/* ====================================================== */}
      {/* Collection stack                                      */}
      {/* ====================================================== */}

      <div
        className="
          relative

          flex
          items-center
          justify-center

          rounded-[20px]

          px-3
          py-4

          transition-all
          duration-400

          group-hover:bg-[rgba(207,162,71,0.035)]
        "
      >
        {/* Soft collection glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-1

            rounded-full

            bg-[radial-gradient(
              circle,
              rgba(207,162,71,0.16),
              transparent_68%
            )]

            opacity-0

            blur-xl

            transition-all
            duration-500

            group-hover:opacity-100
          "
        />

        <div className="relative z-10">
          <CollectionStack
            books={books}
            size="md"
          />
        </div>
      </div>

      {/* ====================================================== */}
      {/* Collection information                                */}
      {/* ====================================================== */}

      <div className="mt-2.5 w-full min-w-0">
        <h3
          className="
            line-clamp-2

            font-heading
            text-xs
            font-semibold
            leading-snug

            text-[var(--text)]

            transition-colors
            duration-300

            group-hover:text-[var(--brown-700)]

            sm:text-[13px]
            lg:text-sm
          "
        >
          {name}
        </h3>

        <div
          className="
            mt-1

            flex
            items-center
            justify-center
            gap-1.5
          "
        >
          <span
            className="
              h-1
              w-1

              rounded-full

              bg-[var(--gold)]

              opacity-60
            "
          />
        </div>
      </div>
    </button>
  );
}