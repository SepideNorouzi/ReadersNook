import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;

  hydrate: () => void;
  setTokens: (accessToken: string, refreshToken?: string) => void;
  logout: () => void;
}

function readStoredTokens() {
  try {
    return {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
}

export const useAuthStore = create<AuthStore>((set) => {
  const { accessToken, refreshToken } = readStoredTokens();

  return {
    accessToken,
    refreshToken,
    isAuthenticated: Boolean(accessToken),
    hydrated: true,

    hydrate: () => {
      const tokens = readStoredTokens();

      set({
        ...tokens,
        isAuthenticated: Boolean(tokens.accessToken),
        hydrated: true,
      });
    },

    setTokens: (accessToken, refreshToken) => {
      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      set((state) => ({
        accessToken,
        refreshToken: refreshToken ?? state.refreshToken,
        isAuthenticated: true,
      }));
    },

    logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      set({ accessToken: null, refreshToken: null, isAuthenticated: false });
    },
  };
});
