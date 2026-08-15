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

  const { adminLogin } = useAuth();
  const autoLogin = adminLogin.mutate;
  const autoLoginPending = adminLogin.isPending;

  useEffect(() => {
    hydrate();
  }, [hydrate]);
  // When the app starts, restore whatever authentication information was saved previously

  useEffect(() => {
    if (!DEV_AUTO_LOGIN) return;
    if (mode !== "admin") return;
    if (!hydrated) return; // don't race the real localStorage check
    if (isAuthenticated) return; // already have a session — don't re-login
    if (autoLoginPending) return;

    const username = import.meta.env.VITE_DEV_USERNAME;
    const password = import.meta.env.VITE_DEV_PASSWORD;
    if (!username || !password) return;

    autoLogin({ username, password });
  }, [mode, hydrated, isAuthenticated, autoLogin, autoLoginPending]);

  return null;
}
