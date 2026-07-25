import CollectionStack from "./CollectionStack";
import type { CollectionWithBooks } from "../../../types/collection";

export interface CollectionCardProps {
  collection: CollectionWithBooks;
  onClick?: (collection: CollectionWithBooks) => void;
}

export default function CollectionItem({
  collection,
  onClick,
}: CollectionCardProps) {
  const { name, books } = collection;
  const count = books.length;

  return (
    <div
      className="
        flex
        flex-col
        items-center
        gap-3

        py-2

        transition-transform
        duration-200

        hover:-translate-y-0.5
      "
    >
      <CollectionStack books={books} onClick={() => onClick?.(collection)} />

      <div className="text-center">
        <h3 className="font-heading text-sm font-semibold text-[var(--text)]">
          {name}
        </h3>

        <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
          {count} {count === 1 ? "book" : "books"}
        </p>
      </div>
    </div>
  );
}
