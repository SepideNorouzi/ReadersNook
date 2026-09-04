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
        items-start

        gap-4
        px-2
        py-2.5

        sm:gap-6
        sm:px-4
        sm:py-5

        lg:gap-8
        lg:px-6
        lg:py-6
      "
    >
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="
            w-[82px]
            shrink-0

            sm:w-[110px]
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