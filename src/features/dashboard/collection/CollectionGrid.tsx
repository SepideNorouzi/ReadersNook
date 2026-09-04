import type { CollectionWithBooks } from "../../../types/collection";
import CollectionItem from "./CollectionItem";

export interface CollectionGridProps {
  collections: CollectionWithBooks[];
  onCollectionClick?: (collection: CollectionWithBooks) => void;
}

export default function CollectionGrid({
  collections,
  onCollectionClick,
}: CollectionGridProps) {
  return (
    <div
      className="
        flex
        w-max
        min-w-full
        items-start
        gap-4
        px-2
        py-2.5

        sm:gap-6
        sm:px-4
        sm:py-5

        lg:grid
        lg:w-full
        lg:min-w-0
        lg:grid-cols-2
        lg:gap-5
        lg:px-4
        lg:py-4
      "
    >
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="
            w-[82px]
            shrink-0

            sm:w-[110px]

            lg:w-full
            lg:min-w-0
          "
        >
          <CollectionItem
            collection={collection}
            onClick={onCollectionClick}
          />
        </div>
      ))}
    </div>
  );
}