import { useQuery } from "@tanstack/react-query";

import { getBooks } from "../services/books";

export function useBooks() {
  return useQuery({
    queryKey: ["books"],

    queryFn: getBooks,
  });
}