import { create } from "zustand";
import { profile as defaultProfile } from "../data/profile";
import type { Profile } from "../types/auth";

interface DemoProfileStore {
  profile: Profile;
  setAvatar: (avatarUrl: string) => void;
  setName: (name: string) => void;
  resetProfile: () => void;
}

export const useDemoProfileStore = create<DemoProfileStore>((set) => ({
  profile: defaultProfile,
  setAvatar: (avatarUrl) =>
    set((state) => ({ profile: { ...state.profile, avatarUrl } })),
  setName: (name) => set((state) => ({ profile: { ...state.profile, name } })),
  resetProfile: () => set({ profile: defaultProfile }),
}));
