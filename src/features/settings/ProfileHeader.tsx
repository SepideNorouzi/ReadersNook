import { Sparkles, UserRound, Pencil, Check, X } from "lucide-react";
import { useState } from "react";

import type { Profile } from "../../auth/types/auth";

import AvatarPicker from "./AvatarPicker";
import { useProfileEditor } from "../../auth/hooks/useProfileEditor";

interface Props {
  user: Profile;
  showAvatarPicker: boolean;
  onAvatarPickerChange: (open: boolean) => void;
}

export default function ProfileHeader({
  user,
  showAvatarPicker,
  onAvatarPickerChange,
}: Props) {
  const account =
    user.id === "guest" ? "Browsing in demo mode" : "Reader's Nook Member";

  const { updateAvatar, updateName, isUpdatingAvatar, isUpdatingName } =
    useProfileEditor();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(user.name);
  const [nameError, setNameError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleAvatarSelect = async (avatarUrl: string) => {
    try {
      setAvatarError(null);
      await updateAvatar(avatarUrl);
      onAvatarPickerChange(false);
    } catch (error) {
      console.error("Failed to update avatar:", error);
      setAvatarError(
        error instanceof Error ? error.message : "Couldn't update avatar.",
      );
    }
  };

  const startEditingName = () => {
    setNameDraft(user.name);
    setNameError(null);
    setIsEditingName(true);
  };

  const cancelEditingName = () => {
    setIsEditingName(false);
    setNameError(null);
  };

  const saveName = async () => {
    const trimmed = nameDraft.trim();

    if (!trimmed) {
      setNameError("Name can't be empty.");
      return;
    }

    if (trimmed === user.name) {
      setIsEditingName(false);
      return;
    }

    try {
      setNameError(null);
      await updateName(trimmed);
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to update name:", error);
      setNameError(
        error instanceof Error ? error.message : "Couldn't save your name.",
      );
    }
  };

  return (
    <section
      className="
        relative isolate overflow-hidden
        rounded-[24px]
        border border-[var(--brown-700)]
        bg-gradient-to-br
        from-[var(--sidebar-bg-start)]
        via-[var(--brown-800)]
        to-[var(--sidebar-bg-end)]
        px-5 py-6
        shadow-[0_18px_40px_rgba(35,23,17,0.16)]
        sm:px-7 sm:py-7
      "
    >
      <div
        className="
          pointer-events-none absolute
          -right-16 -top-20
          h-48 w-48
          rounded-full
          bg-[var(--gold)]/18
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-20 left-1/4
          h-40 w-40
          rounded-full
          bg-[var(--orange)]/10
          blur-3xl
        "
      />

      <div className="relative flex items-center gap-4 sm:gap-5">
        {/* Avatar */}
        <button
          type="button"
          onClick={() => onAvatarPickerChange(true)}
          className="
            group
            relative
            flex h-16 w-16 shrink-0
            items-center justify-center
            overflow-hidden rounded-full
            border-2 border-[var(--gold)]/35
            bg-[var(--brown-700)]
            shadow-[0_8px_22px_rgba(0,0,0,0.18)]
            sm:h-20 sm:w-20
          "
          aria-label="Change profile avatar"
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="
                h-full w-full
                object-cover
                transition-transform duration-300
                group-hover:scale-105
              "
            />
          ) : (
            <UserRound size={30} className="text-[var(--sidebar-text-muted)]" />
          )}

          <span
            className="
              absolute inset-0
              flex items-center justify-center
              bg-[rgba(35,23,17,0.48)]
              opacity-0
              transition-opacity duration-200
              group-hover:opacity-100
            "
          >
            <Pencil size={17} className="text-[var(--gold-light)]" />
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-1.5">
            <Sparkles
              size={12}
              className="text-[var(--gold)]"
              fill="currentColor"
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[var(--gold)]
              "
            >
              Your reading space
            </span>
          </div>

          {isEditingName ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={nameDraft}
                onChange={(event) => setNameDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") saveName();
                  if (event.key === "Escape") cancelEditingName();
                }}
                disabled={isUpdatingName}
                autoFocus
                className="
                  min-w-0 flex-1
                  rounded-lg
                  border border-[var(--gold)]/40
                  bg-[var(--brown-700)]/60
                  px-2 py-1
                  font-heading text-xl font-semibold
                  text-[var(--sidebar-text)]
                  outline-none
                  focus:border-[var(--gold)]
                  disabled:opacity-60
                  sm:text-[1.65rem]
                "
              />

              <button
                type="button"
                onClick={saveName}
                disabled={isUpdatingName}
                aria-label="Save name"
                className="
                  shrink-0 rounded-full p-1
                  text-[var(--gold)]
                  hover:bg-[var(--gold)]/15
                  disabled:opacity-50
                "
              >
                <Check size={16} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                onClick={cancelEditingName}
                disabled={isUpdatingName}
                aria-label="Cancel editing name"
                className="
                  shrink-0 rounded-full p-1
                  text-[var(--sidebar-text-secondary)]
                  hover:bg-white/10
                  disabled:opacity-50
                "
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <h1
                className="
                  line-clamp-2
                  font-heading
                  text-xl font-semibold
                  text-[var(--sidebar-text)]
                  sm:text-[1.65rem]
                "
              >
                Welcome back, {user.name}
              </h1>

              <button
                type="button"
                onClick={startEditingName}
                aria-label="Edit name"
                className="
                  shrink-0 rounded-full p-1
                  text-[var(--sidebar-text-secondary)]
                  hover:bg-white/10 hover:text-[var(--gold)]
                "
              >
                <Pencil size={13} />
              </button>
            </div>
          )}

          {nameError && (
            <p className="mt-1 text-xs text-red-300">{nameError}</p>
          )}

          {avatarError && (
            <p className="mt-1 text-xs text-red-300">{avatarError}</p>
          )}

          <p
            className="
              mt-1
              text-xs
              text-[var(--sidebar-text-secondary)]
              sm:text-sm
            "
          >
            {account}
          </p>
        </div>
      </div>

      {/* Avatar picker */}
      {showAvatarPicker && (
        <div className="relative z-20 mt-5">
          <AvatarPicker
            currentAvatar={user.avatarUrl}
            onSelect={handleAvatarSelect}
            onClose={() => onAvatarPickerChange(false)}
            isSaving={isUpdatingAvatar}
          />
        </div>
      )}
    </section>
  );
}
