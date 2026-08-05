import { useQuery } from "@tanstack/react-query";
import { getCollectionsWithBooks } from "../services/collection";

export function useCollections() {
  const query = useQuery({
    queryKey: ["collections"],
    queryFn: getCollectionsWithBooks,
  });

  return {
    ...query,
    collections: query.data ?? [],
  };
}
