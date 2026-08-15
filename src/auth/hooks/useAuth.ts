import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { authRepository } from "../repo/authRepo";
import { useAuthStore } from "../store/authStore";
import { authKeys } from "../queries/authKeys";
import { adminAuthRepo } from "../repo/adminAuthRepo";

export function useAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const storeLogout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: userLoading,
    isError,
  } = authRepository.useMe();

  const login = authRepository.useLogin();
  const register = authRepository.useRegister();
  const adminLogin = adminAuthRepo.useLogin();

  const logout = () => {
    storeLogout();
    queryClient.removeQueries({ queryKey: authKeys.all });
  };

  // Query failed to fetch the profile → token is invalid/expired.
  // (Demo mode's useMe() never errors, so this is effectively admin-only.)
  useEffect(() => {
    if (isError) logout();
  }, [isError]);

  return {
    user,
    userLoading,
    isAuthenticated,
    login,
    adminLogin,
    register,
    logout,
  };
}
