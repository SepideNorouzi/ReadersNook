import ProfileHeader from "../features/settings/ProfileHeader";
import ProfileStats from "../features/settings/ProfileStats";
import SettingsActions from "../features/settings/SettingsActions";
import ReadingGoalSettings from "../features/settings/ReadingGoal";

import { useBooks } from "../hooks/useBooks";
import { useAuth } from "../auth/hooks/useAuth";

export default function Settings() {
  const { user, userLoading } = useAuth();
  const { data: books = [], isLoading: booksLoading } = useBooks();

  const isLoading = booksLoading || userLoading;

  if (isLoading) {
    return (
      <main className="p-6 pt-20 md:p-10 md:pt-8">
        <p className="text-[var(--text-muted)]">
          Loading your profile...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-6 pt-24 md:p-10 md:pt-8">
        <p className="text-[var(--text-muted)]">
          Couldn't load profile.
        </p>
      </main>
    );
  }

  return (
    <main className="p-6 pt-24 md:p-10 md:pt-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* Profile */}
        <ProfileHeader user={user} />

        {/* Reading statistics */}
        <ProfileStats books={books} />

        {/* Preferences */}
        <section className="rounded-3xl bg-[var(--bg-secondary)] p-5 md:p-6">
          <div className="mb-5">
            <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
              Preferences
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Customize your reading experience.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <ReadingGoalSettings />
            <SettingsActions />
          </div>
        </section>
      </div>
    </main>
  );
}