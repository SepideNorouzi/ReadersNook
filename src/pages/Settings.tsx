import { useBooks } from "../hooks/useBooks";
import { useAuth } from "../auth/hooks/useAuth";

import ProfileHeader from "../features/settings/ProfileHeader";
import ProfileStats from "../features/settings/ProfileStats";
import SettingsActions from "../features/settings/SettingsActions";
import ReadingGoalSettings from "../features/settings/ReadingGoal";
import SettingsSection from "../features/settings/SettingsSection";

export default function Settings() {
  const { user, userLoading } = useAuth();
  const { data: books = [], isLoading: booksLoading } = useBooks();

  if (userLoading || booksLoading) {
    return (
      <main className="p-4 pt-20 lg:pt-20 sm:p-20 ">
        <p className="text-sm text-[var(--text-muted)]">
          Loading your profile...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-4 pt-20 sm:pt-20 lg:pt-20">
        <p className="text-sm text-[var(--text-muted)]">
          Couldn't load profile.
        </p>
      </main>
    );
  }

  return (
    <main className="p-4 pt-20 sm:pt-20 lg:pt-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <ProfileHeader user={user} />

        <ProfileStats books={books} />

        <SettingsSection
          title="Preferences"
          description="Customize your reading experience."
        >
          <ReadingGoalSettings />
          <SettingsActions />
        </SettingsSection>
      </div>
    </main>
  );
}
