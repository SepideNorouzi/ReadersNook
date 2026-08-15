import { useQueryClient } from "@tanstack/react-query";

import { authRepository } from "../repo/authRepo";
import { useAuthStore } from "../store/authStore";
import { authKeys } from "../queries/authKeys";

export function useAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const storeLogout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = authRepository.useMe();

  const login = authRepository.useLogin();
  const register = authRepository.useRegister();

  const logout = () => {
    storeLogout();
    // Drop any cached profile data so a re-login (possibly as a
    // different user) never flashes stale info before refetching.
    queryClient.removeQueries({ queryKey: authKeys.all });
  };

  return { user, userLoading, isAuthenticated, login, register, logout };
}
