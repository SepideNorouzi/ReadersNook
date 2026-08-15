import { useMutation, useQuery } from "@tanstack/react-query";

import { profile } from "../data/profile";
import { authKeys } from "../queries/authKeys";
import type { LoginCredentials, RegisterData } from "../types/auth";

export const demoAuthRepo = {
  useMe() {
    return useQuery({
      queryKey: authKeys.me("demo"),
      queryFn: async () => profile,
      staleTime: Infinity,
    });
  },

  useLogin() {
    return useMutation({
      mutationFn: async (_credentials: LoginCredentials) => profile, //prefixed with _ since it's intentionally unused
    });
  },

  useRegister() {
    return useMutation({
      mutationFn: async (_data: RegisterData) => profile,
    });
  },
};
