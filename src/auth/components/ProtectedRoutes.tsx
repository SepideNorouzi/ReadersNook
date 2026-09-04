import { Navigate, Outlet } from "react-router";

import { useModeStore } from "../../store/modeStore";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../hooks/useAuth";
import Loading from "../../shared/Loading";

export default function ProtectedRoutes() {
  const mode = useModeStore((state) => state.mode);
  const hydrated = useAuthStore((state) => state.hydrated);
  const { isAuthenticated, userLoading } = useAuth();

  // Demo mode has no real session to guard — skip straight through.
  if (mode === "demo") return <Outlet />;

  // Don't decide "not logged in" before hydrate() has read localStorage —
  // same reasoning your FlashLingo version had with `initialized`.
  if (!hydrated) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  // Token exists, but the profile query is still resolving.
  if (userLoading) return <Loading />;

  return <Outlet />;
}
