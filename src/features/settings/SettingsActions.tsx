import { LogIn, LogOut, Moon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import Card from "../../ui/Card";
import { useAuth } from "../../auth/hooks/useAuth";
import { useModeStore } from "../../store/modeStore";

export default function SettingsActions() {
  const [darkMode, setDarkMode] = useState(false);

  const mode = useModeStore((state) => state.mode);
  const setMode = useModeStore((state) => state.setMode);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isDemo = mode === "demo";

  const handleAuthAction = async () => {
    if (isDemo) {
      // navigate("/auth");
      navigate("/progress");
      return;
    }

    await logout();
    setMode("demo");
    navigate("/");
  };

  const toggleDarkMode = () => {
    const next = !darkMode;

    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <Card
      className="
        rounded-[20px]
        border border-[var(--brown-200)]
        bg-[var(--surface)]
        p-4
        sm:p-5
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              bg-[var(--brown-100)]
              text-[var(--brown-700)]
            "
          >
            <Moon size={18} />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-medium text-[var(--text)]">
              Night Mode
            </h3>

            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
              Switch to the dark appearance.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          aria-pressed={darkMode}
          className={`
            flex h-7 w-12 shrink-0
            items-center rounded-full
            p-1
            transition-colors
            ${darkMode ? "bg-[var(--brown-600)]" : "bg-[var(--stone-300)]"}
          `}
        >
          <span
            className={`
              h-5 w-5 rounded-full bg-white
              shadow-sm
              transition-transform
              ${darkMode ? "translate-x-5" : ""}
            `}
          />
        </button>
      </div>

      <div className="my-4 h-px bg-[var(--border)]" />

      <button
        type="button"
        onClick={handleAuthAction}
        className={`
          flex w-full
          items-center gap-3
          rounded-xl
          px-3 py-2.5
          text-sm font-medium
          transition-colors
          ${
            isDemo
              ? `
                text-[var(--brown-700)]
                hover:bg-[var(--brown-50)]
              `
              : `
                text-[var(--orange)]
                hover:bg-[var(--orange-light)]
              `
          }
        `}
      >
        {isDemo ? <LogIn size={17} /> : <LogOut size={17} />}

        <span>{isDemo ? "Sign In" : "Log Out"}</span>
      </button>
    </Card>
  );
}
