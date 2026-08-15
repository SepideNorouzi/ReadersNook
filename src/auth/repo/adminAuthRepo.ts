import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AuthHttpError,
  getMe,
  login,
  refreshToken,
  register,
  toProfile,
} from "../services/auth";
import { useAuthStore } from "../store/authStore";
import { authKeys } from "../queries/authKeys";

import type { LoginCredentials, RegisterData, TokenResponse } from "../types/auth";

let refreshInFlight: Promise<TokenResponse> | null = null;

async function refreshSession(): Promise<TokenResponse> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const refresh = useAuthStore.getState().refreshToken;
    if (!refresh) {
      throw new AuthHttpError("Refresh token expired.", 401);
    }

    const tokens = await refreshToken(refresh);
    useAuthStore.getState().setTokens(tokens.access, tokens.refresh);
    return tokens;
  })().finally(() => {
    refreshInFlight = null;
  });

  return refreshInFlight;
}

export const adminAuthRepo = {
  useMe(enabled = true) {
    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
      queryKey: authKeys.me("admin"),
      queryFn: async () => {
        const token = useAuthStore.getState().accessToken;
        if (!token) {
          throw new AuthHttpError("Not authenticated.", 401);
        }

        try {
          return toProfile(await getMe(token));
        } catch (error) {
          if (!(error instanceof AuthHttpError) || error.status !== 401) {
            throw error;
          }

          const tokens = await refreshSession();
          return toProfile(await getMe(tokens.access));
        }
      },
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
