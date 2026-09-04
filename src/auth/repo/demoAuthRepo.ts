import { useMutation } from "@tanstack/react-query";
import { useDemoProfileStore } from "../store/demoProfileStore";
import type { LoginCredentials, RegisterData } from "../types/auth";

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
      mutationFn: async (avatarUrl: string) => {
        setAvatar(avatarUrl);
        return avatarUrl;
      },
    });
  },
};
