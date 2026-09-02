
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

      {/* ================= Header Message ================= */}

      <div
        className="
          hidden
          md:block

          absolute

          right-20
          top-36

          lg:right-20

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

            md:text-[3rem]

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

            md:mt-5
            md:max-w-[355px]
            md:text-[15px]
          "
        >
          Build your own digital library and
          <br className="hidden md:block" />
          track your reading journey.
        </p>
      </div>

      {/* ================= Hero Stats ================= */}

      <div
        className="
          absolute
          z-30

          inset-x-0
          bottom-4

          flex
          justify-center

          bg-white/10
          backdrop-blur-sm

          py-3

          [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]
          [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]

          sm:bottom-12
          sm:py-4

          md:inset-x-auto
          md:right-20
          md:bottom-16

          md:bg-transparent
          md:backdrop-blur-none
          md:py-0
          md:[mask-image:none]
          md:[-webkit-mask-image:none]

          xl:right-18
          xl:bottom-28
        "
      >
        <HeroStats
          stats={[
            { icon: BookOpen, value: stats.totalBooks, label: "Books" },
            { icon: Flame, value: stats.streak, label: "streak" },
            { icon: Quote, value: stats.quotes, label: "Quotes" },
            { icon: Folder, value: stats.collections, label: "Collections" },
          ]}
        />
      </div>
    </section>
  );
}

