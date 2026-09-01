import { BookOpen, Flame, Quote, Folder } from "lucide-react";

import hero from "../../assets/hero.png";

import useScrollFade from "../../hooks/useScrollFade";
import { useDashboardStats } from "../../hooks/useDashboardStats";

import StatBadge from "../../components/ui/StatBadge";

import "../../styles/headerEffects.css";

export default function AppHeader() {
  const fadeRef = useScrollFade();

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
