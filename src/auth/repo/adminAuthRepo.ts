import { useMutation, useQuery } from "@tanstack/react-query";

import { getMe, login, register } from "../services/auth";

import { useAuthStore } from "../store/authStore";

import type { LoginCredentials, RegisterData } from "../types/auth";

export const adminAuthRepo = {
  useMe(enabled = true) {
    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
      queryKey: ["auth", "me"],
      queryFn: () => getMe(accessToken!),
      enabled: enabled && Boolean(accessToken),
      retry: false,
    });
  },

  useLogin() {
    const setTokens = useAuthStore((state) => state.setTokens);

    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
      mutationFn: async (credentials: LoginCredentials) => {
        const tokens = await login(credentials);

        setTokens(tokens.access, tokens.refresh);

        const user = await getMe(tokens.access);

        setUser(user);

        return user;
      },
    });
  },

  useRegister() {
    return useMutation({
      mutationFn: async (data: RegisterData) => {
        return register(data);
      },
    });
  },
};
