import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

import {
  invalidateAuthTransport,
} from "../authTransport";

import type {
  LoginCredentials,
  RegisterData,
  TokenResponse,
} from "../types/auth";

let refreshInFlight: Promise<TokenResponse> | null = null;

async function refreshSession(): Promise<TokenResponse> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    const refresh =
      useAuthStore.getState().refreshToken;

    if (!refresh) {
      throw new AuthHttpError(
        "Refresh token expired.",
        401,
      );
    }

    const tokens =
      await refreshToken(refresh);

    useAuthStore
      .getState()
      .setTokens(
        tokens.access,
        tokens.refresh,
      );

    return tokens;
  })().finally(() => {
    refreshInFlight = null;
  });

  return refreshInFlight;
}

export const adminAuthRepo = {
  useMe(enabled = true) {
    const accessToken = useAuthStore(
      (state) => state.accessToken,
    );

    return useQuery({
      queryKey: authKeys.me("admin"),

      queryFn: async () => {
        const token =
          useAuthStore.getState().accessToken;

        if (!token) {
          throw new AuthHttpError(
            "Not authenticated.",
            401,
          );
        }

        try {
          const rawUser =
            await getMe(token);

          const user =
            toProfile(rawUser);

          useAuthStore
            .getState()
            .setUsername(user.username);

          return user;
        } catch (error) {
          if (
            !(
              error instanceof AuthHttpError
            ) ||
            error.status !== 401
          ) {
            throw error;
          }

          const tokens =
            await refreshSession();

          const rawUser =
            await getMe(tokens.access);

          const user =
            toProfile(rawUser);

          useAuthStore
            .getState()
            .setUsername(user.username);

          return user;
        }
      },

      enabled:
        enabled &&
        Boolean(accessToken),

      retry: false,
    });
  },

  useLogin() {
    const setSession = useAuthStore(
      (state) => state.setSession,
    );

    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: async (
        credentials: LoginCredentials,
      ) => {
        const tokens =
          await login(credentials);

        // Find out which user owns the token.
        const rawUser =
          await getMe(tokens.access);

        const user =
          toProfile(rawUser);

        // A login is a new client session.
        invalidateAuthTransport();

        // Remove cached data from the previous
        // account before storing the new session.
        queryClient.clear();

        setSession(
          tokens.access,
          tokens.refresh,
          user.username,
        );

        queryClient.setQueryData(
          authKeys.me("admin"),
          user,
        );

        return user;
      },
    });
  },

  useRegister() {
    return useMutation({
      mutationFn: async (
        data: RegisterData,
      ) => {
        return toProfile(
          await register(data),
        );
      },
    });
  },
};