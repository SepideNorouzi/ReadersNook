import { useMutation } from "@tanstack/react-query";

import { useReadingGoalStore } from "../../store/readingGoalStore";

export const demoReadingGoalRepo = {
  useReadingGoal() {
    const readingGoal = useReadingGoalStore((state) => state.readingGoal);

    return {
      data: readingGoal,
      isLoading: false,
      isError: false,
      error: null,
    };
  },

  useUpdateReadingGoal() {
    return useMutation({
      mutationFn: async (readingGoal: number) => {
        useReadingGoalStore.getState().setReadingGoal(readingGoal);

        return readingGoal;
      },
    });
  },
};
