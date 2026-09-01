import illustration from "../../assets/hero.png";

import { BookOpen, Flame, Quote, Folder } from "lucide-react";

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

        h-[260px]

        overflow-hidden

        sm:h-[300px]

        lg:h-[360px]

        xl:h-[420px]
      "
    >

      {/* ================= Hero Background ================= */}

      <img
        src={illustration}
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

          right-16

          top-16

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



      {/* ================= Stats ================= */}

      <div
        className="
          absolute

          z-30

          bottom-6

          left-1/2

          -translate-x-1/2

          lg:left-auto

          lg:right-12

          lg:bottom-10

          xl:right-16
        "
      >
        <div
          className="
            flex

            gap-2

            overflow-x-auto

            max-w-[calc(100vw-32px)]

            scrollbar-none
          "
        >

          <StatBadge
            icon={BookOpen}
            value={stats.totalBooks}
            label="Books"
          />

          <StatBadge
            icon={Flame}
            value={stats.streak}
            label="Day Streak"
          />

          <StatBadge
            icon={Quote}
            value={stats.quotes}
            label="Quotes"
          />

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