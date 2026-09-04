import { BookOpen, UserRound } from "lucide-react";
import { NavLink, useLocation } from "react-router";

import { navItems } from "./NavItem";
import { useAuth } from "../../auth/hooks/useAuth";

import "../../styles/desktopNav.css";

export default function DesktopNavbar() {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  const desktopNavItems = navItems.filter((item) =>
    ["Home", "My Library", "Collections", "Search", "Quotes"].includes(
      item.label,
    ),
  );

  return (
    <nav
      className="
    absolute
    inset-x-0
    top-0
    z-40

    hidden
    lg:flex

    h-20

    items-center
    justify-between

    px-12
    xl:px-16
  "
    >
      {/* ================= Logo / Dashboard ================= */}

      <NavLink
        to="/dashboard"
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-2xl

            bg-gradient-to-br
            from-[var(--sidebar-accent-start)]
            to-[var(--sidebar-accent-end)]

            text-white

            shadow-[0_12px_30px_rgba(54,35,27,.28),inset_0_1px_1px_rgba(255,255,255,.18)]

            transition-all
            duration-200
            ease-out

            hover:-translate-y-0.5
            hover:shadow-[0_14px_34px_rgba(54,35,27,.34),inset_0_1px_1px_rgba(255,255,255,.2)]

            active:translate-y-0
            active:scale-95
          "
        >
          <BookOpen size={20} />
        </div>

        <span
          className="
            font-heading
            text-xl
            font-bold
            text-[var(--text)]
          "
        >
          Reader's Nook
        </span>
      </NavLink>

      {/* ================= Center Navigation ================= */}

      <div className="desktop-navbar__links">
        {desktopNavItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`desktop-navbar__link${
                active ? " desktop-navbar__link--active" : ""
              }`}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>

      {/* ================= Profile ================= */}

      {/* Right: Profile */}
      <NavLink
        to="/settings"
        aria-label="Open settings"
        className="
    relative
    flex
    h-11
    w-11
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
      h-10
      w-10
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
            <UserRound size={18} strokeWidth={2} className="text-white" />
          )}
        </div>
      </NavLink>
    </nav>
  );
}
