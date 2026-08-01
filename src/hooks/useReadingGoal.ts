import { useMemo } from "react";
import { useBooks } from "./useBooks";

/** Keep in sync with achievements YEARLY_GOAL. */
export const YEARLY_GOAL = 10;

export function useReadingGoal() {
  const { data: books = [], isLoading, error } = useBooks();

  return useMemo(() => {
    const booksRead = books.filter((book) => book.status === "read").length;
    const progress = Math.min((booksRead / YEARLY_GOAL) * 100, 100);

    return {
      booksRead,
      yearlyGoal: YEARLY_GOAL,
      progress,
      isLoading,
      error,
    };
  }, [books, isLoading, error]);
}
