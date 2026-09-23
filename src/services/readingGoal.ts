import { apiFetch } from "../lib/apiClient";

import type {
  ApiLibrary,
  ApiLibraryGoalUpdatePayload,
} from "../types/api/apiBook";

/**
 * GET /library/
 *
 * The library response contains the user's current reading goal.
 */
export async function getReadingGoal(): Promise<number> {
  const library = await apiFetch<ApiLibrary>("/library/");

  return library.reading_goal;
}

/**
 * PATCH /library/goal/
 *
 * Update the user's yearly reading goal.
 */
export async function updateReadingGoal(readingGoal: number): Promise<number> {
  const payload: ApiLibraryGoalUpdatePayload = {
    reading_goal: readingGoal,
  };

  const library = await apiFetch<ApiLibrary>("/library/goal/", {
    method: "PATCH",
    body: payload,
  });

  return library.reading_goal;
}
