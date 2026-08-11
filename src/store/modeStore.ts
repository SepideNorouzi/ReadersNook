import { create } from "zustand";

export type AppMode = "demo" | "admin";

interface ModeStore {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

export const useModeStore = create<ModeStore>((set) => ({
  mode: "demo",
  setMode: (mode) => set({ mode }),
}));
