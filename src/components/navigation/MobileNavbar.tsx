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
      className={
        pinned
          ? "absolute top-0 z-[1] h-0 w-full overflow-visible lg:hidden"
          : "absolute inset-x-0 top-0 z-20 lg:hidden"
      }
    >
      <nav
        className="
          mx-4
          mt-4
          flex
          h-14
          items-center
          justify-between
          rounded-full
          border
          border-white/20
          bg-white/15
          px-5
          backdrop-blur-md
        "
      >
        {/* Menu */}
        <button
          aria-label="Open menu"
          onClick={onMenuClick}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition-colors
            hover:bg-white/10
          "
        >
          <Menu size={22} className="text-white" />
        </button>

        {/* Profile avatar → settings */}
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
            bg-white/15
            transition-transform
            hover:scale-105
          "
        >
          {userLoading ? (
            <div className="h-full w-full animate-pulse rounded-full bg-white/20" />
          ) : user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={18} className="text-white" />
          )}
        </NavLink>
      </nav>
    </header>
  );
}
