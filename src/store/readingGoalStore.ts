import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReadingGoalState {
  readingGoal: number;
  setReadingGoal: (goal: number) => void;
}

export const useReadingGoalStore = create<ReadingGoalState>()(
  persist(
    (set) => ({
      readingGoal: 12,

      setReadingGoal: (goal) => {
        set({ readingGoal: goal });
      },
    }),
    {
      name: "reading-goal",
    },
  ),
);
