import { authRepository } from "../repo/auth/AuthRepo";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const user = useAuthStore((state) => state.user);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const logout = useAuthStore((state) => state.logout);

  const login = authRepository.useLogin();
  const register = authRepository.useRegister();

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
