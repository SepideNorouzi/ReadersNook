import ProfileHeader from "../features/settings/ProfileHeader";
import ProfileStats from "../features/settings/ProfileStats";
import SettingsActions from "../features/settings/SettingsActions";

import { useBooks } from "../hooks/useBooks";
import { useAuth } from "../auth/hooks/useAuth";

export default function Settings() {
  const { user, userLoading } = useAuth();
  const { data: books = [], isLoading: booksLoading } = useBooks();

  const isLoading = booksLoading || userLoading;

  if (isLoading) {
    return (
      <main className="p-10">
        <p className="text-[var(--text-muted)]">Loading your profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-10">
        <p className="text-[var(--text-muted)]">Couldn't load profile.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-10">
      <ProfileHeader user={user} />
      <ProfileStats books={books} />
      <SettingsActions />
    </main>
  );
}
