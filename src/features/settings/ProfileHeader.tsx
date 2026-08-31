import { UserRound } from "lucide-react";

import type { Profile } from "../../auth/types/auth";

interface Props {
  user: Profile;
}

export default function ProfileHeader({ user }: Props) {
  const account =
    user.id === "guest" ? "Browsing in demo mode" : "Reader's Nook Member";

  return (
    <div
      className="
        relative isolate overflow-hidden rounded-2xl
        px-6 py-7 sm:px-8 sm:py-8
        shadow-[var(--shadow)]
        bg-[linear-gradient(135deg,var(--sidebar-bg-start)_0%,var(--sidebar-bg-end)_100%)]
      "
    >
      {/* soft gold glow, echoes the sidebar's accent color */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -right-8 -top-14
          h-44 w-44 rounded-full
          bg-[var(--sidebar-accent-start)] opacity-20 blur-3xl
        "
      />

      <div className="relative flex items-center gap-5">
        <div
          className="
            flex h-20 w-20 shrink-0 items-center justify-center
            overflow-hidden rounded-full
            border-2 border-[var(--sidebar-border)]
            bg-[var(--brown-800)]
          "
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={32} className="text-[var(--sidebar-text-muted)]" />
          )}
        </div>

        <div className="space-y-1.5">
          <h1 className="font-heading text-2xl font-semibold text-[var(--sidebar-text)] sm:text-[1.7rem]">
            Welcome back, {user.name}
          </h1>
          <p className="text-sm text-[var(--sidebar-text-secondary)]">
            {account}
          </p>
        </div>
      </div>
    </div>
  );
}