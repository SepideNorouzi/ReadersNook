import { useMutation } from "@tanstack/react-query";
import { useDemoProfileStore } from "../store/demoProfileStore";
import type { LoginCredentials, RegisterData } from "../types/auth";
import { resolveAvatarSrc } from "../../lib/avatars";

export const demoAuthRepo = {
  useMe() {
    const profile = useDemoProfileStore((state) => state.profile);
    return { data: profile, isLoading: false, isError: false, error: null };
  },

  useLogin() {
    return useMutation({
      mutationFn: async (_credentials: LoginCredentials) =>
        useDemoProfileStore.getState().profile,
    });
  },

  useRegister() {
    return useMutation({
      mutationFn: async (_data: RegisterData) =>
        useDemoProfileStore.getState().profile,
    });
  },

  useUpdateAvatar() {
    const setAvatar = useDemoProfileStore((state) => state.setAvatar);
    return useMutation({
      mutationFn: async (avatarId: string) => {
        const src = resolveAvatarSrc(avatarId);
        if (src) setAvatar(src);
        return useDemoProfileStore.getState().profile;
      },
    });
  },

  useUpdateName() {
    const setName = useDemoProfileStore((state) => state.setName);
    return useMutation({
      mutationFn: async (name: string) => {
        setName(name);
        return useDemoProfileStore.getState().profile;
      },
    });
  },
};
