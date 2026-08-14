import { useEffect } from "react";

import { useAuthStore } from "../auth/store/authStore";

import { getMe } from "../auth/services/auth";

export function AuthInitializer() {
  const hydrate = useAuthStore((state) => state.hydrate);

  const accessToken = useAuthStore((state) => state.accessToken);

  const setUser = useAuthStore((state) => state.setUser);

  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!accessToken) return;

    getMe(accessToken)
      .then(setUser)
      .catch(() => {
        logout();
      });
  }, [accessToken, setUser, logout]);

  return null;
}
