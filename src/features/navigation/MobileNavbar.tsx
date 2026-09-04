import { Menu, UserRound } from "lucide-react";
import { NavLink } from "react-router";

import { useAuth } from "../../auth/hooks/useAuth";

interface MobileNavbarProps {
  onMenuClick: () => void;
  pinned?: boolean;
}

export default function MobileNavbar({
  onMenuClick,
  pinned = false,
}: MobileNavbarProps) {
  const { user, userLoading } = useAuth();

  return (
    <header
      className={`
        absolute
        inset-x-0
        top-0
        z-30
        lg:hidden
        pointer-events-none

        ${pinned ? "h-0 overflow-visible" : ""}
      `}
    >
      <nav
        className="
          relative
          flex
          h-16
          w-full
          items-center
          justify-between
          px-4
          sm:px-5
          pointer-events-auto
        "
      >
        {/* Left: Menu */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            transition-all
            duration-200
            hover:bg-white/10
            active:scale-95
          "
        >
          <Menu size={22} strokeWidth={2} className="text-white" />
        </button>

        {/* Center: Logo */}
        <NavLink
          to="/dashboard"
          aria-label="Go to dashboard"
          className="
            pointer-events-auto
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            whitespace-nowrap
          "
        >
          <span
            className="
              font-heading
              text-sm
              font-bold
              tracking-tight
              bg-gradient-to-r
              from-[var(--brown-600)]
              via-[var(--gold)]
              to-[var(--brown-400)]
              bg-clip-text
              text-transparent
              drop-shadow-[0_2px_8px_rgba(207,162,71,0.25)]
            "
          >
            Reader's Nook
          </span>
        </NavLink>

        {/* Right: Profile */}
        <NavLink
          to="/settings"
          aria-label="Open settings"
          className="
    relative
    flex
    h-9
    w-9
    shrink-0
    items-center
    justify-center
    rounded-full

    border
    border-[var(--gold)]

    bg-white/15

    shadow-[0_0_10px_rgba(207,162,71,0.20)]

    transition-all
    duration-200

    hover:scale-105
    hover:shadow-[0_0_14px_rgba(207,162,71,0.32)]

    active:scale-95
  "
        >
          {/* Inner spacing between the ring and badge */}
          <div
            className="
      flex
      h-6
      w-6
      items-center
      justify-center
      overflow-hidden
      rounded-full

      bg-white/20

      ring-1
      ring-white/20
    "
          >
            {userLoading ? (
              <div
                className="
          h-full
          w-full
          animate-pulse
          rounded-full
          bg-white/20
        "
              />
            ) : user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className="
          h-full
          w-full
          object-cover
        "
              />
            ) : (
              <UserRound size={16} strokeWidth={2} className="text-white" />
            )}
          </div>
        </NavLink>
      </nav>
    </header>
  );
}
