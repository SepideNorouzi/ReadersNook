import { create } from "zustand";
import type { AuthUser } from "../types/auth";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  hydrated: boolean;

  hydrate: () => void;

  setTokens: (accessToken: string, refreshToken: string) => void;

  setUser: (user: AuthUser) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  hydrated: false,

  hydrate: () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    set({
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken),
      hydrated: true,
    });
  },

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
