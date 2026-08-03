import CollectionStack from "./CollectionStack";
import type { CollectionWithBooks } from "../../../types/collection";

export interface CollectionCardProps {
  collection: CollectionWithBooks;
  onClick?: (collection: CollectionWithBooks) => void;
  /** Tighter layout for the mobile horizontal rail */
  compact?: boolean;
}

export default function CollectionItem({
  collection,
  onClick,
  compact = false,
}: CollectionCardProps) {
  const { name, books } = collection;
  const count = books.length;

  return (
    <button
      type="button"
      onClick={() => onClick?.(collection)}
      className={`
        flex
        w-full
        flex-col
        items-center
        text-left

        transition-transform
        duration-200

        hover:-translate-y-0.5
        active:scale-[0.98]

        ${compact ? "gap-2 py-1" : "gap-2.5 py-2 sm:gap-3"}
      `}
    >
      <CollectionStack books={books} size={compact ? "sm" : "md"} />

      <div className="w-full min-w-0 text-center">
        <h3
          className={`
            line-clamp-2
            font-heading
            font-semibold
            text-[var(--text)]
            ${compact ? "text-xs leading-snug" : "text-sm"}
          `}
        >
          {name}
        </h3>

        <p
          className={`
            mt-0.5
            text-[var(--text-secondary)]
            ${compact ? "text-[10px]" : "text-[11px]"}
          `}
        >
          {count} {count === 1 ? "book" : "books"}
        </p>
      </div>
    </button>
  );
}
