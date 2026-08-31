import illustration from "../../assets/hero.png";
import useScrollFade from "../../hooks/useScrollFade";
import "../../styles/headerEffects.css";

export default function AppHeader() {
  const fadeRef = useScrollFade();

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
        <img
          src={illustration}
          alt="Books on a shelf"
          className="h-full w-full object-contain"
        />
      </div>

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          lg:bg-[linear-gradient(to_right,transparent_0%,transparent_40%,rgba(0,0,0,0.1)_62%,rgba(0,0,0,0.4)_100%)]

          bg-[linear-gradient(to_top,transparent_0%,transparent_10%,rgba(0,0,0,0.1)_62%,rgba(0,0,0,0.4)_100%)]
        "
      />

      <div
        className="
          absolute
          right-6
          top-8
          max-w-[320px]
          text-right

          lg:right-12
          lg:top-12
          lg:max-w-md
        "
      >
        <h2
          className="
            hero-title
            font-hero
            text-3xl

            sm:text-4xl

            lg:text-6xl
          "
        >
          Escape Into Stories
        </h2>

        <p
          className="
            mt-2
            font-serif
            text-sm
            font-medium
            leading-relaxed
            tracking-wide
            text-[var(--burgundy-dark)]

            sm:text-base

            lg:mt-3
            lg:text-sm
          "
        >
          Build your own cozy digital library.
        </p>
      </div>
    </section>
  );
}