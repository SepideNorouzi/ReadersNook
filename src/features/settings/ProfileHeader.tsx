// src/features/Settings/ProfileHeader.tsx
import { UserRound } from "lucide-react";

import type { Profile } from "../../types/profile";
import Card from "../../components/ui/Card";

interface Props {
  profile: Profile;
}

export default function ProfileHeader({ profile }: Props) {
  return (
    <Card className="flex items-center gap-5">
      <div
        className="
          flex h-20 w-20 shrink-0 items-center justify-center
          overflow-hidden rounded-full
          border border-[var(--border)] bg-[var(--stone-100)]
        "
      >
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <UserRound size={32} className="text-[var(--text-muted)]" />
        )}
      </div>

      <div>
        <h1 className="font-heading text-2xl font-semibold text-[var(--text)]">
          {profile.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {profile.id === "guest"
            ? "Browsing in demo mode"
            : "Reader's Nook member"}
        </p>
      </div>
    </Card>
  );
}
