import type { CollectionWithBooks } from "../../../types/collection";
import CollectionsItem from "./CollectionItem";

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
        items-center

        gap-5

        px-5
        py-5

        sm:gap-6
        sm:px-6
        sm:py-6

        lg:gap-8
        lg:px-8
        lg:py-7
      "
    >
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="
            w-[108px]
            shrink-0

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
