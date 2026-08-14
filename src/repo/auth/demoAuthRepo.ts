import { useMutation, useQuery } from "@tanstack/react-query";

import { profile } from "../../data/profile";

export const demoAuthRepo = {
  useMe() {
    return useQuery({
      queryKey: ["auth", "me", "demo"],
      queryFn: async () => profile,
      staleTime: Infinity,
    });
  },

  useLogin() {
    return useMutation({
      mutationFn: async () => {
        return profile;
      },
    });
  },

  useRegister() {
    return useMutation({
      mutationFn: async () => {
        return profile;
      },
    });
  },
};
