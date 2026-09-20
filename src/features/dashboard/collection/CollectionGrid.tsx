import type { CollectionWithBooks } from "../../../types/collection";
import CollectionItem from "./CollectionItem";

export interface CollectionGridProps {
  collections: CollectionWithBooks[];
  onCollectionClick?: (collection: CollectionWithBooks) => void;
  /**
   * "grid"  (default) – current dashboard behavior: horizontal scroll on
   *          mobile/tablet, collapses to a 2-col grid at lg+ (fits a narrow tile).
   * "shelf" – always stays a horizontal scroll row, even at lg+ (fits a
   *          full-width section like the Library page).
   */
  variant?: "grid" | "shelf";
}

export default function CollectionGrid({
  collections,
  onCollectionClick,
  variant = "grid",
}: CollectionGridProps) {
  return (
    <div
      className={`
        flex w-max min-w-full items-start gap-4 px-2 py-2.5
        sm:gap-6 sm:px-4 sm:py-5
        ${
          variant === "grid"
            ? "lg:grid lg:w-full lg:min-w-0 lg:grid-cols-2 lg:gap-5 lg:px-4 lg:py-4"
            : "lg:gap-6 lg:px-4 lg:py-5"
        }
      `}
    >
      {collections.map((collection) => (
        <div
          key={collection.id}
          className={`
            w-[82px] shrink-0 sm:w-[110px]
            ${variant === "grid" ? "lg:w-full lg:min-w-0" : "lg:w-[130px]"}
          `}
        >
          <CollectionItem collection={collection} onClick={onCollectionClick} />
        </div>
      ))}
    </div>
  );
}
