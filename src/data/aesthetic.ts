import type { AestheticPhoto } from "../types/aestheticPhoto";
import { collections } from "./collection";

function loadSortedUrls(modules: Record<string, string>): string[] {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}

const urlsByCollectionId: Record<string, string[]> = {
  c1: loadSortedUrls(
    import.meta.glob<string>("../assets/aesthetic/acotar/*.{jpg,jpeg,png,webp}", {
      eager: true,
      import: "default",
    }),
  ),
  c2: loadSortedUrls(
    import.meta.glob<string>("../assets/aesthetic/tog/*.{jpg,jpeg,png,webp}", {
      eager: true,
      import: "default",
    }),
  ),
  c3: loadSortedUrls(
    import.meta.glob<string>("../assets/aesthetic/hp/*.{jpg,jpeg,png,webp}", {
      eager: true,
      import: "default",
    }),
  ),
};

export const aestheticPhotos: AestheticPhoto[] = collections.flatMap(
  (collection) => {
    const urls = urlsByCollectionId[collection.id] ?? [];

    return collection.bookIds.flatMap((bookId) =>
      urls.map((imageUrl, index) => ({
        id: `aes-${collection.id}-${bookId}-${index + 1}`,
        bookId,
        imageUrl,
      })),
    );
  },
);
