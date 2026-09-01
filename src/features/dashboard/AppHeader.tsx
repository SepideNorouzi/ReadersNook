import illustration from "../../assets/hero.png";

import {
  BookOpen,
  Flame,
  NotebookPen,
  Folder,
} from "lucide-react";

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

        h-[240px]

        overflow-hidden

        sm:h-[260px]

        lg:h-[320px]

        xl:h-[360px]
      "
    >


      {/* Illustration */}

      <div
        className="
          absolute

          right-10
          bottom-8

          h-35
          w-35


          sm:right-8
          sm:h-52
          sm:w-52


          lg:left-17
          lg:bottom-13
          lg:h-70
          lg:w-70
        "
      >

        <div
          aria-hidden
          className="
            pointer-events-none

            absolute
            left-1/2
            top-1/2

            -z-10

            h-[85%]
            w-[85%]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-[radial-gradient(circle,rgba(218,174,92,0.48)_0%,rgba(218,174,92,0.22)_40%,transparent_75%)]

            blur-2xl
          "
        />


        <img
          src={illustration}
          alt="Books on a shelf"
          className="
            relative
            z-10

            h-full
            w-full

            object-contain
          "
        />

      </div>



      {/* Overlay */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(28,19,14,0.45)_0%,rgba(28,19,14,0.18)_20%,transparent_42%,transparent_58%,rgba(59,40,31,0.18)_80%,rgba(59,40,31,0.45)_100%)]
        "
      />




      {/* Main Content */}

      <div
        className="
          relative
          z-20
          flex
          h-full
          flex-col
          justify-center
          px-6
          sm:px-8
          lg:px-12
          left-10
        "
      >


        <div
          className="
            max-w-[420px]
          "
        >

          {/* Stats */}

          <div
            className="
              mt-5

              flex

              max-w-full

              gap-2

              overflow-x-auto

              pb-1

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
              icon={NotebookPen}
              value={stats.notes}
              label="Notes"
            />


            <StatBadge
              icon={Folder}
              value={stats.collections}
              label="Collections"
            />


          </div>


        </div>


      </div>




      {/* Desktop Right Message */}

      <div
        className="
          hidden

          lg:block

          absolute

          right-17

          top-15

          max-w-[320px]

          text-right
        "
      >

        <h2
          className="
            hero-title

            font-hero

            text-xl


            sm:text-4xl


            lg:text-6xl
          "
        >
          Escape Into Stories
        </h2>


        <p
          className="
            mt-3

            text-xs

            font-serif

            font-small

            leading-relaxed

            tracking-wide

            text-[var(--burgundy-dark)]


            sm:text-base
          "
        >
          Build your own digital library✨
        </p>


      </div>


    </section>
  );
}