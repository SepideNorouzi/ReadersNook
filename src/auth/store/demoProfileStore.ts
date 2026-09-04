import { create } from "zustand";
import { profile as defaultProfile } from "../data/profile";
import type { Profile } from "../types/auth";

interface DemoProfileStore {
  profile: Profile;
  setAvatar: (avatarUrl: string) => void;
  resetProfile: () => void;
}

export const useDemoProfileStore = create<DemoProfileStore>((set) => ({
  profile: defaultProfile,
  setAvatar: (avatarUrl) =>
    set((state) => ({ profile: { ...state.profile, avatarUrl } })),
  resetProfile: () => set({ profile: defaultProfile }),
}));
