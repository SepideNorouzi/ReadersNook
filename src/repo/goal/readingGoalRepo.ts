import { useModeStore } from "../../store/modeStore";

import { demoReadingGoalRepo } from "./demoReadingGoal";
import { adminReadingGoalRepo } from "./adminReadingGoal";

export const readingGoalRepository = {
  useReadingGoal() {
    const mode = useModeStore((state) => state.mode);

    const isAdmin = mode === "admin";

    const demoGoal = demoReadingGoalRepo.useReadingGoal();

    const adminGoal = adminReadingGoalRepo.useReadingGoal(isAdmin);

    return isAdmin ? adminGoal : demoGoal;
  },

  useUpdateReadingGoal() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoReadingGoalRepo.useUpdateReadingGoal();

    const adminMutation = adminReadingGoalRepo.useUpdateReadingGoal();

    return mode === "demo" ? demoMutation : adminMutation;
  },
};
