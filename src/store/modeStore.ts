import { create } from "zustand";

export type AppMode = "demo" | "admin";

const MODE_KEY = "appMode";

interface ModeStore {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

function readStoredMode(): AppMode {
  try {
    const stored = localStorage.getItem(MODE_KEY);
    if (stored === "admin" || stored === "demo") return stored;
  } catch {
    // localStorage can throw in private-mode browsers
  }
  return "demo";
}

export const useModeStore = create<ModeStore>((set) => ({
  mode: readStoredMode(),
  setMode: (mode) => {
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {
      // ignore quota / privacy errors — in-memory mode still updates
    }
    set({ mode });
  },
}));
