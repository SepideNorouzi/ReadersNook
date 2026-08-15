import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { authRepository } from "../repo/authRepo";
import { useAuthStore } from "../store/authStore";
import { authKeys } from "../queries/authKeys";
import { adminAuthRepo } from "../repo/adminAuthRepo";
import { AuthHttpError } from "../services/auth";

export function useAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const storeLogout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: userLoading,
    isError,
    error,
  } = authRepository.useMe();

  const login = authRepository.useLogin();
  const register = authRepository.useRegister();
  const adminLogin = adminAuthRepo.useLogin();
  const adminRegister = adminAuthRepo.useRegister();

  const logout = useCallback(() => {
    storeLogout();
    queryClient.removeQueries({ queryKey: authKeys.all });
  }, [storeLogout, queryClient]);

  // Only drop the session when the backend rejects the credentials.
  // A network blip or 500 should not wipe a valid refresh token.
  useEffect(() => {
    if (!isError) return;
    if (error instanceof AuthHttpError && error.status === 401) {
      logout();
    }
  }, [isError, error, logout]);

  return {
    user,
    userLoading,
    isAuthenticated,
    login,
    adminLogin,
    register,
    adminRegister,
    logout,
  };
}
