import { profile } from "../data/profile";
import type { Profile } from "../types/profile";

export async function getProfile(): Promise<Profile> {
  return profile;
}
