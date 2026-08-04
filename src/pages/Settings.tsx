// src/modals/Settings.tsx
import AchievementsGrid from "../features/settings/AchievementsGrid";
import ProfileHeader from "../features/settings/ProfileHeader";
import ProfileStats from "../features/settings/ProfileStats";
import { useBooks } from "../hooks/useBooks";
import { useProfile } from "../hooks/useProfile";

export default function Settings() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: books = [], isLoading: booksLoading } = useBooks();

  const isLoading = profileLoading || booksLoading;

  if (isLoading) {
    return (
      <main className="p-10">
        <p className="text-[var(--text-muted)]">Loading your profile...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="p-10">
        <p className="text-[var(--text-muted)]">Couldn't load profile.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-10">
      <ProfileHeader profile={profile} />
      <ProfileStats books={books} />
      <AchievementsGrid />
    </main>
  );
}
