import { useBooks } from "./useBooks";

export function useReadingGoal() {
  const { data: books = [], isLoading, error } = useBooks();

  const booksRead = books.filter((book) => book.status === "read").length;

  const yearlyGoal = 10;

  const progress = Math.min((booksRead / yearlyGoal) * 100, 100);

  return {
    booksRead,
    yearlyGoal,
    progress,
    isLoading,
    error,
  };
}
