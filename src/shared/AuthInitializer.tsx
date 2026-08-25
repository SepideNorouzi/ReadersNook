import { useEffect } from "react";

import { useAuthStore } from "../auth/store/authStore";
import { useModeStore } from "../store/modeStore";

export function AuthInitializer() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const mode = useModeStore((state) => state.mode);


  useEffect(() => {
    hydrate();
  }, [hydrate]);
  // When the app starts, restore whatever authentication information was saved previously

  useEffect(() => {
    if (mode !== "admin") return;
    if (!hydrated) return; // don't race the real localStorage check
    if (isAuthenticated) return; // already have a session — don't re-login

  }, [mode, hydrated, isAuthenticated]);

  return null;
}
