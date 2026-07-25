import type { CollectionWithBooks } from "../../../types/collection";
import CollectionsItem from "./CollectionItem";

export interface CollectionGridProps {
  collections: CollectionWithBooks[];
}

function CollectionGrid({ collections }: CollectionGridProps) {
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
        <CollectionsItem key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

export default CollectionGrid;
