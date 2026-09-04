import { queryClient } from "../lib/queryClient";
import { useAuthStore } from "./store/authStore";
import { invalidateAuthTransport } from "./authTransport";

export async function logoutSession() {
  // Invalidate the session FIRST.
  // Any request finishing from this point onward
  // belongs to the old session.
  invalidateAuthTransport();

  // Remove credentials immediately.
  useAuthStore.getState().logout();

  // Then stop old queries.
  await queryClient.cancelQueries();

  // Finally remove every cached result.
  queryClient.clear();
}