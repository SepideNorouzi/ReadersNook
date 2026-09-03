import { queryClient } from "../lib/queryClient";

import { useAuthStore } from "./store/authStore";

import {
  invalidateAuthTransport,
} from "./authTransport";

export async function logoutSession() {
  await queryClient.cancelQueries();

  invalidateAuthTransport();

  useAuthStore.getState().logout();

  queryClient.clear();
}