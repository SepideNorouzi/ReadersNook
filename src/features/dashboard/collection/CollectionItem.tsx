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
  const count = books.length;

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
      {/* Collection stack */}
      <div
        className="
          relative
          flex
          items-center
          justify-center

          rounded-[24px]

          px-4
          py-5

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
            inset-0

            rounded-full

            bg-[radial-gradient(
              circle,
              rgba(207,162,71,0.18),
              transparent_68%
            )]

            opacity-0
            blur-2xl

            transition-all
            duration-500

            group-hover:scale-110
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

      {/* Collection information */}
      <div className="mt-3 w-full min-w-0">
        <h3
          className="
            line-clamp-2

            font-heading
            text-lg
            font-semibold
            leading-snug

            text-[var(--text)]

            transition-colors
            duration-300

            group-hover:text-[var(--brown-700)]

            lg:text-[16px]
          "
        >
          {name}
        </h3>

        <div
          className="
            mt-1.5
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

          <p
            className="
              text-[10px]
              font-medium
              text-[var(--text-secondary)]

              lg:text-[11px]
            "
          >
            {count} {count === 1 ? "book" : "books"}
          </p>
        </div>
      </div>
    </button>
  );
}