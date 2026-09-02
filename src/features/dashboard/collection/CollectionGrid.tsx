import type { CollectionWithBooks } from "../../../types/collection";
import CollectionsItem from "./CollectionItem";

export interface CollectionGridProps {
  collections: CollectionWithBooks[];
  onCollectionClick?: (collection: CollectionWithBooks) => void;
}

function CollectionGrid({
  collections,
  onCollectionClick,
}: CollectionGridProps) {
  return (
    <div
      className="
        flex
        h-full
        w-max
        min-w-full
        items-center

        gap-4
        px-5
        py-4

        sm:gap-5
        sm:px-6
        sm:py-5

        lg:gap-7
        lg:px-8
        lg:py-6

        snap-x
        snap-mandatory
      "
    >
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="
            w-[108px]
            shrink-0
            snap-start

            sm:w-[124px]

            lg:w-[142px]
          "
        >
          <CollectionsItem
            collection={collection}
            onClick={onCollectionClick}
          />
        </div>
      ))}
    </div>
  );
}

export default CollectionGrid;
