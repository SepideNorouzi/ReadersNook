import { Navigate } from "react-router";

import { useModeStore } from "../../store/modeStore";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../hooks/useAuth";
import Loading from "../../shared/Loading";


interface Props {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function RedirectIfAuthenticated({
  children,
  redirectTo = "/",
}: Props) {
  const mode = useModeStore((state) => state.mode);
  const hydrated = useAuthStore((state) => state.hydrated);
  const { isAuthenticated } = useAuth();

  if (mode === "demo") return <>{children}</>;

  if (!hydrated) return <Loading />;

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
}
