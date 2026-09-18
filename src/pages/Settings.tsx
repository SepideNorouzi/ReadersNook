import { useBooks } from "../hooks/useBooks";
import { useAuth } from "../auth/hooks/useAuth";

import ProfileHeader from "../features/settings/ProfileHeader";
import ProfileStats from "../features/settings/ProfileStats";
import SettingsActions from "../features/settings/SettingsActions";
import ReadingGoalSettings from "../features/settings/ReadingGoal";
import SettingsSection from "../features/settings/SettingsSection";
import { useEffect, useState } from "react";
import AvatarReminderToast from "../features/settings/AvatarReminder";
import { useLocation } from "react-router";

export default function Settings() {
  const { user, userLoading } = useAuth();
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const location = useLocation();

  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showAvatarToast, setShowAvatarToast] = useState(false);

  useEffect(() => {
    if (!user) return;

    if (!user.avatarUrl) {
      setShowAvatarToast(true);
    }
  }, [user]);

  useEffect(() => {
    if (userLoading || booksLoading) return; // element isn't rendered yet
    if (!location.hash) return;

    const target = document.getElementById(location.hash.slice(1));

    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, [location.hash, userLoading, booksLoading]);

  if (userLoading || booksLoading) {
    return (
      <main className="p-4 pt-20 lg:pt-20 sm:p-20">
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
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          z-0 h-24
          bg-gradient-to-b
          from-[rgba(35,23,17,0.10)]
          via-[rgba(35,23,17,0.04)]
          to-transparent
          md:hidden
        "
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <ProfileHeader
          user={user}
          showAvatarPicker={showAvatarPicker}
          onAvatarPickerChange={setShowAvatarPicker}
        />

        <ProfileStats books={books} />

        <SettingsSection
          title="Preferences"
          description="Customize your reading experience."
        >
          <div id="reading-goal" className="scroll-mt-24">
            <ReadingGoalSettings />
          </div>
          <SettingsActions />
        </SettingsSection>
      </div>

      {showAvatarToast && !showAvatarPicker && !user.avatarUrl && (
        <AvatarReminderToast
          onChoose={() => {
            setShowAvatarToast(false);
            setShowAvatarPicker(true);
          }}
          onDismiss={() => {
            setShowAvatarToast(false);
          }}
        />
      )}
    </main>
  );
}
