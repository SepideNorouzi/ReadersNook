import { BookOpen, Flame, Quote, Folder, UserRound } from "lucide-react";

import { NavLink } from "react-router";
import { navItems } from "../../components/navigation/NavItem";
import { useLocation } from "react-router";

import { useAuth } from "../../auth/hooks/useAuth";
import hero from "../../assets/hero.png";

import useScrollFade from "../../hooks/useScrollFade";
import { useDashboardStats } from "../../hooks/useDashboardStats";

import StatBadge from "../../components/ui/StatBadge";

import "../../styles/headerEffects.css";

export default function AppHeader() {
  const fadeRef = useScrollFade();
  const { user, userLoading } = useAuth();
  const location = useLocation();

  const stats = useDashboardStats();

  return (
    <section
      ref={fadeRef}
      className="
   sticky
   top-0
   z-0

   h-[300px]

   sm:h-[360px]

   lg:h-[430px]

   xl:h-[530px]

   overflow-hidden
 "
    >
      {/* ================= Hero Background ================= */}

      <img
        src={hero}
        alt="Reading scene"
        className="
          absolute
          inset-0

          h-full
          w-full

          object-cover

          object-left

          sm:object-center

          lg:object-center

          pointer-events-none
          select-none
        "
      />

      {/* ================= Navigation ================= */}

      <header
        className="
    absolute
    inset-x-0
    top-0
    z-40
  "
      >
        {/* Desktop */}

        <nav
          className="
      hidden
      lg:flex

      h-20

      items-center
      justify-between

      px-12
      xl:px-16
    "
        >
          {/* Logo */}

          <div
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
          </div>

          {/* Center navigation */}

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
            {navItems
              .filter((item) =>
                [
                  "Home",
                  "My Library",
                  "Collections",
                  "Search",
                  "Quotes",
                ].includes(item.label),
              )
              .map((item) => {
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

          ${active ? "text-[var(--text)]" : "text-[var(--text-secondary)]"}

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

          {/* Right actions */}

          <div
            className="
    flex
    items-center
    gap-5
  "
          >
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
          </div>
        </nav>
      </header>

      {/* ================= Overlay ================= */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-gradient-to-r

          from-[#241812]/40

          via-transparent

          to-[#3b281f]/20
        "
      />

      {/* ================= Desktop Message ================= */}

      <div
        className="
          hidden

          lg:block

          absolute

          right-20
top-36
xl:right-28

          z-20

          max-w-[360px]

          text-right
        "
      >
        <h2
          className="
            hero-title

            font-hero

            text-5xl

            xl:text-6xl
          "
        >
          Escape Into Stories
        </h2>

        <p
          className="
            mt-3

            text-base

            font-serif

            leading-relaxed

            tracking-wide

            text-[var(--burgundy-dark)]
          "
        >
          Build your own digital library✨
        </p>
      </div>

      {/* ================= Mobile Message ================= */}

      <div
        className="
          absolute

          left-6

          bottom-24

          z-20

          max-w-[260px]

          lg:hidden
        "
      >
        <h2
          className="
            hero-title

            font-hero

            text-3xl
          "
        >
          Escape Into Stories
        </h2>

        <p
          className="
            mt-2

            text-sm

            font-serif

            text-[var(--burgundy-dark)]
          "
        >
          Build your own digital library✨
        </p>
      </div>

      {/* ================= Hero Stats ================= */}

      <div
        className="
    absolute

    z-30


    left-1/2
    -translate-x-1/2


    bottom-10


    w-auto


    sm:bottom-12


    lg:right-24

    lg:left-auto

    lg:translate-x-0


    lg:bottom-16


    xl:right-32

    xl:bottom-20
  "
      >
        <div
          className="
   grid
   grid-cols-2
   gap-3

   sm:flex
   sm:gap-4
 "
        >
          <StatBadge icon={BookOpen} value={stats.totalBooks} label="Books" />

          <StatBadge icon={Flame} value={stats.streak} label="Day Streak" />

          <StatBadge icon={Quote} value={stats.quotes} label="Quotes" />

          <StatBadge
            icon={Folder}
            value={stats.collections}
            label="Collections"
          />
        </div>
      </div>
    </section>
  );
}
