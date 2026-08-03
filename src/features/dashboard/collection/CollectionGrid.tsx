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
    <>
      {/* Mobile: horizontal snap rail of collection stacks */}
      <div
        className="
          -mx-0.5
          flex
          gap-3
          overflow-x-auto
          px-0.5
          pb-2
          scrollbar-hidden
          snap-x
          snap-mandatory

          md:hidden
        "
      >
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="w-[108px] shrink-0 snap-start"
          >
            <CollectionsItem
              collection={collection}
              onClick={onCollectionClick}
              compact
            />
          </div>
        ))}
      </div>

      {/* md+: wrap grid (tablet full-width uses 3 cols, desktop bento uses 2) */}
      <div
        className="
          hidden
          gap-3
          md:grid
          md:grid-cols-3
          xl:grid-cols-2
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
    </>
  );
}

export default CollectionGrid;
