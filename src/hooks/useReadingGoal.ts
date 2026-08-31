import { useReadingGoalStore } from "../store/readingGoalStore";
import { useBooks } from "./useBooks";

export function useReadingGoal() {
  const { data: books = [], isLoading: booksLoading } = useBooks();

  const yearlyGoal = useReadingGoalStore((state) => state.readingGoal);

  const booksRead = books.filter((book) => book.status === "read").length;

  const progress =
    yearlyGoal > 0 ? Math.min((booksRead / yearlyGoal) * 100, 100) : 0;

  return {
    booksRead,
    yearlyGoal,
    progress,
    isLoading: booksLoading,
  };
}
