import { useBooks } from "./useBooks";

import { readingGoalRepository } from "../repo/goal/readingGoalRepo";

import { DEFAULT_READING_GOAL } from "../store/readingGoalStore";

export function useReadingGoal() {
  const {
    data: yearlyGoal = DEFAULT_READING_GOAL,
    isLoading: goalLoading,
    isError: goalError,
    error,
  } = readingGoalRepository.useReadingGoal();

  const { data: books = [], isLoading: booksLoading } = useBooks();

  const booksRead = books.filter((book) => book.status === "read").length;

  const progress =
    yearlyGoal > 0 ? Math.min((booksRead / yearlyGoal) * 100, 100) : 0;

  return {
    booksRead,
    yearlyGoal,
    progress,

    isLoading: goalLoading || booksLoading,

    isError: goalError,
    error,
  };
}

export function useUpdateReadingGoal() {
  return readingGoalRepository.useUpdateReadingGoal();
}
