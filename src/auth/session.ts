import { queryClient } from "../lib/queryClient";
import { useBookStore } from "../store/demoBookStore";
import { useCollectionStore } from "../store/demoCollectionStore";
import { useReadingGoalStore } from "../store/readingGoalStore";

import { useAuthStore } from "./store/authStore";
import { invalidateAuthTransport } from "./authTransport";

/**
 * Drop every piece of client state that belongs to the current account.
 * Tokens are cleared first so in-flight observers cannot refetch as the
 * previous user while React Query is still cancelling.
 */
export function clearClientSession() {
  invalidateAuthTransport();
  useAuthStore.getState().logout();
  useBookStore.getState().resetBooks();
  useCollectionStore.getState().resetCollections();
  useReadingGoalStore.getState().resetReadingGoal();
  queryClient.clear();
}

export async function logoutSession() {
  invalidateAuthTransport();
  useAuthStore.getState().logout();
  useBookStore.getState().resetBooks();
  useCollectionStore.getState().resetCollections();
  useReadingGoalStore.getState().resetReadingGoal();

  await queryClient.cancelQueries();
  queryClient.clear();
}
