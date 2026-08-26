import { Menu, User } from "lucide-react";
import { NavLink } from "react-router";
import { useProfile } from "../../features/profile/useProfile"; // ← adjust to your real hook

interface MobileNavbarProps {
  onMenuClick: () => void;
}

export default function MobileNavbar({ onMenuClick }: MobileNavbarProps) {
  const { data: profile } = useProfile();

  return (
    <header className="absolute inset-x-0 top-0 z-20 lg:hidden">
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
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border
            border-white/30
            transition-transform
            hover:scale-105
          "
        >
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/15">
              <User size={18} className="text-white" />
            </div>
          )}
        </NavLink>
      </nav>
    </header>
  );
}