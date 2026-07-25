import { useEffect, useState } from "react";
import type { CollectionWithBooks } from "../types/collection";
import { getCollectionsWithBooks } from "../services/collection";

export function useCollections() {
  const [collections, setCollections] = useState<CollectionWithBooks[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCollectionsWithBooks().then((data) => {
      setCollections(data);
      setIsLoading(false);
    });
  }, []);

  return { collections, isLoading };
}
