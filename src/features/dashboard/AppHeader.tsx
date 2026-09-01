import { BookOpen, Flame, Quote, Folder } from "lucide-react";

import hero from "../../assets/hero.png";

import useScrollFade from "../../hooks/useScrollFade";
import { useDashboardStats } from "../../hooks/useDashboardStats";

import HeroStats from "../../components/ui/HeroStats";

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
            {/* Main title */}
            <h1
              className="
                font-hero

                text-[2.65rem]
                leading-[0.9]

                tracking-[-0.035em]

                text-[#211914]

                sm:text-[3rem]

                lg:max-w-[480px]
                lg:text-[4.2rem]

                xl:text-[4.6rem]
              "
            >
              Escape into{" "}
              <span className="text-[#ae794c]">
                Stories
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-4

                max-w-[330px]

                font-serif

                text-[14px]
                leading-6

                text-[#675a52]

                lg:mt-5
                lg:max-w-[355px]
                lg:text-[15px]
              "
            >
              Build your own digital library and
              <br className="hidden lg:block" />
              track your reading journey.
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

          sm:bottom-12

          lg:right-24
          lg:left-auto
          lg:translate-x-0
          lg:bottom-16

          xl:right-32
          xl:bottom-20
        "
      >
        <HeroStats
          stats={[
            { icon: BookOpen, value: stats.totalBooks, label: "Books" },
            { icon: Flame, value: stats.streak, label: "Day streak" },
            { icon: Quote, value: stats.quotes, label: "Quotes" },
            { icon: Folder, value: stats.collections, label: "Collections" },
          ]}
        />
      </div>
    </section>
  );
}
