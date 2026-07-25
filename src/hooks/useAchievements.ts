import { useMemo } from "react";
import { useBooks } from "./useBooks";
import { getAchievements } from "../features/dashboard/achievements/achievements";

export function useAchievements() {
  const { data: books = [] } = useBooks();

  return useMemo(() => getAchievements(books), [books]);
}
