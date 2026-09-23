import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getReadingGoal, updateReadingGoal } from "../../services/readingGoal";

import { queryKeys } from "../../queries/queryKeys";

import { useAuthStore } from "../../auth/store/authStore";

function readingGoalKeyForCurrentUser() {
  const username = useAuthStore.getState().username;

  return username
    ? queryKeys.readingGoal(username)
    : (["reading-goal", "anonymous"] as const);
}

export const adminReadingGoalRepo = {
  useReadingGoal(enabled = true) {
    const username = useAuthStore((state) => state.username);

    const queryEnabled = enabled && Boolean(username);

    return useQuery<number>({
      queryKey: username
        ? queryKeys.readingGoal(username)
        : ["reading-goal", "anonymous"],

      queryFn: getReadingGoal,

      enabled: queryEnabled,
    });
  },

  useUpdateReadingGoal() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: updateReadingGoal,

      onSuccess: (readingGoal) => {
        queryClient.setQueryData(readingGoalKeyForCurrentUser(), readingGoal);
      },
    });
  },
};
