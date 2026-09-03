import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { authRepository } from "../repo/authRepo";
import { useAuthStore } from "../store/authStore";
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

  const logout = useCallback(async () => {
    // Stop requests that could still belong to the old account.
    await queryClient.cancelQueries();

    // Remove authentication state.
    storeLogout();

    // Remove ALL cached server data.
    // Books, quotes, reading progress, goals, etc.
    queryClient.removeQueries();
  }, [storeLogout, queryClient]);

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