import { BookOpen, UserRound } from "lucide-react";
import { NavLink, useLocation } from "react-router";

import { navItems } from "./NavItem";
import { useAuth } from "../../auth/hooks/useAuth";

export default function DesktopNavbar() {
  const { user } = useAuth();
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
      {/* ================= Logo ================= */}

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

            rounded-xl

            bg-white/60
            backdrop-blur-md

            shadow-sm
          "
        >
          <BookOpen size={22} />
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

      <div
        className="
          flex
          items-center
          gap-8

          rounded-2xl

          bg-white/30

          px-8
          py-3

          backdrop-blur-md
        "
      >
        {desktopNavItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                relative

                text-sm
                font-medium

                transition-colors

                ${
                  active
                    ? "text-[var(--text)]"
                    : "text-[var(--text-secondary)]"
                }

                hover:text-[var(--text)]
              `}
            >
              {item.label}

              {active && (
                <span
                  className="
                    absolute

                    left-1/2
                    -bottom-3

                    h-1
                    w-1

                    -translate-x-1/2

                    rounded-full

                    bg-[var(--text)]
                  "
                />
              )}
            </NavLink>
          );
        })}
      </div>

      {/* ================= Profile ================= */}

      <NavLink
        to="/settings"
        aria-label="Open settings"
        className="
          flex
          h-10
          w-10

          overflow-hidden

          rounded-full

          bg-white/40

          border
          border-white/30

          backdrop-blur-md

          transition-transform

          hover:scale-105
          active:scale-95
        "
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="Profile"
            className="
              h-full
              w-full
              object-cover
            "
          />
        ) : (
          <UserRound
            size={20}
            className="
              m-auto
              text-[var(--text)]
            "
          />
        )}
      </NavLink>
    </nav>
  );
}