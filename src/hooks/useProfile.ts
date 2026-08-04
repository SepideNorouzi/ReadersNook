import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}
