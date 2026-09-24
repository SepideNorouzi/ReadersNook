import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AuthHttpError,
  getMe,
  login,
  refreshToken,
  register,
  toProfile,
  updateAvatar,
  updateName,
} from "../services/auth";

import { useAuthStore } from "../store/authStore";
import { authKeys } from "../queries/authKeys";

import type {
  LoginCredentials,
  RegisterData,
  TokenResponse,
} from "../types/auth";
import { getAuthTransportVersion } from "../authTransport";
import { logoutSession } from "../session";

let refreshInFlight: {
  version: number;
  promise: Promise<TokenResponse>;
} | null = null;

// Extract the 401, refresh, retry pattern
async function withAuthRetry<T>(
  request: (accessToken: string) => Promise<T>,
): Promise<T> {
  const token = useAuthStore.getState().accessToken;
  if (!token) throw new AuthHttpError("Not authenticated.", 401);

  try {
    return await request(token); // ← the `await` matters
  } catch (error) {
    if (!(error instanceof AuthHttpError) || error.status !== 401) throw error;
    const tokens = await refreshSession();
    return request(tokens.access);
  }
}

async function refreshSession(): Promise<TokenResponse> {
  const currentVersion = getAuthTransportVersion();

  if (refreshInFlight && refreshInFlight.version === currentVersion) {
    return refreshInFlight.promise;
  }

  const promise = (async () => {
    const refresh = useAuthStore.getState().refreshToken;

    if (!refresh) {
      throw new AuthHttpError("Refresh token expired.", 401);
    }

    const tokens = await refreshToken(refresh);

    // User logged out or switched accounts
    // while the refresh was running.
    if (currentVersion !== getAuthTransportVersion()) {
      throw new AuthHttpError("Authentication session changed.", 401);
    }

    useAuthStore.getState().setTokens(tokens.access, tokens.refresh);

    return tokens;
  })();

  refreshInFlight = {
    version: currentVersion,
    promise,
  };

  try {
    return await promise;
  } finally {
    if (refreshInFlight?.promise === promise) {
      refreshInFlight = null;
    }
  }
}

export const adminAuthRepo = {
  useMe(enabled = true) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const username = useAuthStore((state) => state.username);

    return useQuery({
      queryKey: authKeys.me("admin", username ?? "anonymous"),

      queryFn: async () => {
        const user = toProfile(await withAuthRetry(getMe));
        useAuthStore.getState().setUsername(user.username);
        return user;
      },

      enabled: enabled && Boolean(accessToken),

      retry: false,
    });
  },

  useLogin() {
    const setSession = useAuthStore((state) => state.setSession);

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (credentials: LoginCredentials) => {
        const tokens = await login(credentials);

        // Find out which user owns the token.
        const rawUser = await getMe(tokens.access);

        const user = toProfile(rawUser);

        // Drop the previous account's tokens, caches, and
        // in-memory demo data before installing this session.
        await queryClient.cancelQueries();
        logoutSession();

        setSession(tokens.access, tokens.refresh, user.username);

        queryClient.setQueryData(authKeys.me("admin", user.username), user);

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

  useUpdateAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (avatarId: string) =>
        toProfile(
          await withAuthRetry((token) => updateAvatar(token, avatarId)),
        ),
      onSuccess: (user) => {
        queryClient.setQueryData(authKeys.me("admin", user.username), user);
      },
    });
  },

  useUpdateName() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (name: string) =>
        toProfile(await withAuthRetry((token) => updateName(token, name))),
      onSuccess: (user) => {
        queryClient.setQueryData(authKeys.me("admin", user.username), user);
      },
    });
  },
};
