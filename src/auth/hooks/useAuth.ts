import { useCallback, useEffect } from "react";
import { adminAuthRepo } from "../repo/adminAuthRepo";
import { authRepository } from "../repo/authRepo";
import { useAuthStore } from "../store/authStore";
import { logoutSession } from "../session";
import { AuthHttpError } from "../services/auth";

export function useAuth() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

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
    return logoutSession();
  }, []);

  useEffect(() => {
    if (!isError) return;

    if (
      error instanceof AuthHttpError &&
      error.status === 401
    ) {
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