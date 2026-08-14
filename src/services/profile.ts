import { getMe } from "./auth";

import type { Profile } from "../types/profile";

export async function getProfile(accessToken: string): Promise<Profile> {
  const user = await getMe(accessToken);

  return {
    id: user.username,
    name: `${user.first_name} ${user.last_name}`.trim(),
    username: user.username,
    avatarUrl: null,
  };
}
