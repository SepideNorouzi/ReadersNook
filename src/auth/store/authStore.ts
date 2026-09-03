import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;

  isAuthenticated: boolean;
  hydrated: boolean;

  hydrate: () => void;

  // Used when a user logs in.
  setSession: (
    accessToken: string,
    refreshToken: string | undefined,
    username: string,
  ) => void;

  // Used when refreshing an existing session.
  setTokens: (
    accessToken: string,
    refreshToken?: string,
  ) => void;

  // Used after /auth/me tells us who the token belongs to.
  setUsername: (username: string) => void;

  logout: () => void;
}

function readStoredAuth() {
  try {
    return {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      username: localStorage.getItem("username"),
    };
  } catch {
    return {
      accessToken: null,
      refreshToken: null,
      username: null,
    };
  }
}

export const useAuthStore = create<AuthStore>((set) => {
  const stored = readStoredAuth();

  return {
    accessToken: stored.accessToken,
    refreshToken: stored.refreshToken,
    username: stored.username,

    isAuthenticated: Boolean(stored.accessToken),
    hydrated: true,

    hydrate: () => {
      const auth = readStoredAuth();

      set({
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        username: auth.username,
        isAuthenticated: Boolean(auth.accessToken),
        hydrated: true,
      });
    },

    setSession: (
      accessToken,
      refreshToken,
      username,
    ) => {
      localStorage.setItem(
        "accessToken",
        accessToken,
      );

      localStorage.setItem(
        "username",
        username,
      );

      if (refreshToken) {
        localStorage.setItem(
          "refreshToken",
          refreshToken,
        );
      } else {
        localStorage.removeItem(
          "refreshToken",
        );
      }

      set({
        accessToken,
        refreshToken: refreshToken ?? null,
        username,
        isAuthenticated: true,
      });
    },

    setTokens: (
      accessToken,
      refreshToken,
    ) => {
      localStorage.setItem(
        "accessToken",
        accessToken,
      );

      if (refreshToken) {
        localStorage.setItem(
          "refreshToken",
          refreshToken,
        );
      }

      set((state) => ({
        accessToken,
        refreshToken:
          refreshToken ?? state.refreshToken,
        isAuthenticated: true,
      }));
    },

    setUsername: (username) => {
      localStorage.setItem(
        "username",
        username,
      );

      set({
        username,
      });
    },

    logout: () => {
      localStorage.removeItem(
        "accessToken",
      );

      localStorage.removeItem(
        "refreshToken",
      );

      localStorage.removeItem(
        "username",
      );

      set({
        accessToken: null,
        refreshToken: null,
        username: null,
        isAuthenticated: false,
      });
    },
  };
});