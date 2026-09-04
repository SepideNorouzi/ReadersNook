import { Sparkles, UserRound, Pencil } from "lucide-react";

import type { Profile } from "../../auth/types/auth";

import AvatarPicker from "./AvatarPicker";

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

  const handleAvatarSelect = (avatarUrl: string) => {
    /*
     * This is where the selected avatar should be
     * persisted to your user/profile data.
     *
     * For now we update the local UI.
     */
    console.log("Selected avatar:", avatarUrl);

    onAvatarPickerChange(false);
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

        <div className="min-w-0">
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
          />
        </div>
      )}
    </section>
  );
}
