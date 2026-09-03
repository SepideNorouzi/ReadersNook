import { queryClient } from "../lib/queryClient";
import { invalidateAuthTransport } from "./authTransport";
import { useAuthStore } from "./store/authStore";

export async function logoutSession() {
  await queryClient.cancelQueries();

  invalidateAuthTransport();

  useAuthStore.getState().logout();

  queryClient.clear();
}
