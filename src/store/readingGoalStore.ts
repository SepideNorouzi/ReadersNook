import { create } from "zustand";

interface ReadingGoalState {
  readingGoal: number;
  setReadingGoal: (goal: number) => void;
  resetReadingGoal: () => void;
}

const DEFAULT_READING_GOAL = 12;

export const useReadingGoalStore = create<ReadingGoalState>((set) => ({
  readingGoal: DEFAULT_READING_GOAL,

  setReadingGoal: (goal) => {
    set({ readingGoal: goal });
  },

  resetReadingGoal: () => {
    set({ readingGoal: DEFAULT_READING_GOAL });
  },
}));
