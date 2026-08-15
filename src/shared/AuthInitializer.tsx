import { useEffect } from "react";

import { useAuthStore } from "../auth/store/authStore";
import { useModeStore } from "../store/modeStore";
import { useAuth } from "../auth/hooks/useAuth";

const DEV_AUTO_LOGIN =
  import.meta.env.DEV && import.meta.env.VITE_DEV_AUTO_LOGIN === "true";

export function AuthInitializer() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const mode = useModeStore((state) => state.mode);

  const { login } = useAuth();

  useEffect(() => {
    hydrate();
  }, [hydrate]);
  // When the app starts, restore whatever authentication information was saved previously

  useEffect(() => {
    if (!DEV_AUTO_LOGIN) return;
    if (mode !== "admin") return;
    if (!hydrated) return; // don't race the real localStorage check
    if (isAuthenticated) return; // already have a session — don't re-login

    login.mutate({
      username: import.meta.env.VITE_DEV_USERNAME!,
      password: import.meta.env.VITE_DEV_PASSWORD!,
    });
  }, [mode, hydrated, isAuthenticated]);

  return null;
}
