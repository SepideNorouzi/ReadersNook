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
        grid
        grid-cols-1
        gap-3

        sm:grid-cols-2
      "
    >
      {collections.map((collection) => (
        <CollectionsItem
          key={collection.id}
          collection={collection}
          onClick={onCollectionClick}
        />
      ))}
    </div>
  );
}

export default CollectionGrid;
