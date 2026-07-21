import { useQuery } from "@tanstack/react-query";

import { getBook } from "../services/books";

export function useBook(id: string) {
  return useQuery({
    queryKey: ["book", id],

    queryFn: () => getBook(id),
  });
}