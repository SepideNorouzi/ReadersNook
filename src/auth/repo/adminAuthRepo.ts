import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe, login, register, toProfile } from "../services/auth";
import { useAuthStore } from "../store/authStore";
import { authKeys } from "../queries/authKeys";

import type { LoginCredentials, RegisterData } from "../types/auth";

export const adminAuthRepo = {
  useMe(enabled = true) {
    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
      queryKey: authKeys.me("admin"),
      queryFn: async () => toProfile(await getMe(accessToken!)),
      enabled: enabled && Boolean(accessToken),
      retry: false,
    });
  },

  useLogin() {
    const setTokens = useAuthStore((state) => state.setTokens);
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (credentials: LoginCredentials) => {
        const tokens = await login(credentials);
        setTokens(tokens.access, tokens.refresh);

        const user = toProfile(await getMe(tokens.access));

        // Seed the query cache directly instead of writing to Zustand —
        // useMe() will read this immediately, no extra fetch needed.
        queryClient.setQueryData(authKeys.me("admin"), user);

        return user;
      },
    });
  },

  useRegister() {
    return useMutation({
      mutationFn: async (data: RegisterData) => {
        return toProfile(await register(data));
      },
    });
  },
};
