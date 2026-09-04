import { Menu, UserRound } from "lucide-react";
import { NavLink } from "react-router";

import { useAuth } from "../../auth/hooks/useAuth";
// import AppLogo from "../..."; // use your existing logo component here

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
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            flex
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
          "
        >
          {/* Replace this with your actual app logo */}

          <span
            className="
              font-heading
              text-sm
              font-semibold
              tracking-tight
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]
            "
          >
            Reader's Nook
          </span>

          {/*
          <AppLogo
            className="
              h-7
              w-auto

              sm:h-8
            "
          />
          */}
        </div>

        {/* Right: Profile */}
        <NavLink
          to="/settings"
          aria-label="Open settings"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            overflow-hidden

            rounded-full

            border
            border-white/30

            bg-white/10

            shadow-[0_4px_12px_rgba(0,0,0,0.10)]

            transition-all
            duration-200

            hover:scale-105
            hover:bg-white/15

            active:scale-95
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
            <UserRound size={18} strokeWidth={2} className="text-white" />
          )}
        </NavLink>
      </nav>
    </header>
  );
}
