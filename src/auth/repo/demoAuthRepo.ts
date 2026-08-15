import { useMutation, useQuery } from "@tanstack/react-query";

import { profile } from "../data/profile";
import { authKeys } from "../queries/authKeys";

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
      mutationFn: async () => profile,
    });
  },

  useRegister() {
    return useMutation({
      mutationFn: async () => profile,
    });
  },
};
