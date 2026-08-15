// wake the store up from localStorage,
import { useEffect } from "react";

import { useAuthStore } from "../auth/store/authStore";

export function AuthInitializer() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
