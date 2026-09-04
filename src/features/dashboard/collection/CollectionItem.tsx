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
      {/* Books */}
      <div className="relative flex items-center justify-center">
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[-12px]
            rounded-full
            bg-[radial-gradient(
              circle,
              rgba(207,162,71,0.14),
              transparent_68%
            )]
            opacity-0
            blur-xl
            transition-all
            duration-500

            group-hover:scale-110
            group-hover:opacity-100
          "
        />

        <CollectionStack
          books={books}
          size="md"
        />
      </div>

      {/* Collection information */}
      <div className="mt-2.5 w-full min-w-0 sm:mt-3">
        <h3
          className="
            line-clamp-2

            font-heading
            text-[12px]
            font-semibold
            leading-[1.25]

            text-[var(--text)]

            transition-colors
            duration-300

            group-hover:text-[var(--brown-700)]

            sm:text-sm
            lg:text-[16px]
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
            gap-1

            sm:mt-1.5
            sm:gap-1.5
          "
        >
          <span
            className="
              h-[3px]
              w-[3px]
              rounded-full
              bg-[var(--gold)]
              opacity-60

              sm:h-1
              sm:w-1
            "
          />

          <p
            className="
              text-[8px]
              font-medium
              text-[var(--text-secondary)]

              sm:text-[10px]
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