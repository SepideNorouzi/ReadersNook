import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "../services/quotes";

export function useQuotes() {
  return useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
  });
}
