import { useState } from "react";
import { LogOut, LogIn, Moon } from "lucide-react"; // add LogIn
import { useNavigate } from "react-router"; // adjust if you use a different router setup

import { useModeStore } from "../../store/modeStore";
import { useAuth } from "../../auth/hooks/useAuth";

import Card from "../../components/ui/Card";

export default function SettingsActions() {
  const [darkMode, setDarkMode] = useState(false);

  const mode = useModeStore((state) => state.mode);
  const setMode = useModeStore((state) => state.setMode);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isDemo = mode === "demo";

  const handleAuthAction = () => {
    if (isDemo) {
      if (isAuthenticated) {
        setMode("admin");
        navigate("/dashboard");
        return;
      }

      navigate("/auth");
      return;
    }

    setMode("demo");
    logout();
    navigate("/");
  };

  const toggleDarkMode = () => {
    const next = !darkMode;

    setDarkMode(next);

    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-medium text-[var(--text)] flex w-full items-center gap-3 mb-2">
            <Moon />
            <span className="font-medium">Night Mode</span>
          </h2>

          <p className="text-sm text-[var(--text-secondary)]">
            Switch to the dark appearance.
          </p>
        </div>

        <button
          onClick={toggleDarkMode}
          className={`
            flex h-8 w-14 items-center rounded-full
            p-1 transition
            ${darkMode ? "bg-[var(--brown-600)]" : "bg-[var(--stone-300)]"}
          `}
        >
          <span
            className={`
              h-6 w-6 rounded-full bg-white transition-transform
              ${darkMode ? "translate-x-6" : ""}
            `}
          />
        </button>
      </div>

      <div className="border-t border-[var(--border)] pt-5">
        <button
          onClick={handleAuthAction}
          className="flex w-full items-center gap-3 rounded-xl p-3 text-red-600 transition-colors hover:bg-red-50"
        >
          {isDemo ? <LogIn size={18} /> : <LogOut size={18} />}
          <span className="font-medium">{isDemo ? "Sign In" : "Log Out"}</span>
        </button>
      </div>
    </Card>
  );
}
