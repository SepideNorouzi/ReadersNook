import illustration from "../../assets/hero.png";
import useScrollFade from "../../hooks/useScrollFade";

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
      left-17
      bottom-13

      h-35
      w-35

      sm:right-8
      sm:h-52
      sm:w-52

      lg:left-17
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
      absolute
      inset-0
      bg-gradient-to-r
      from-black/35
      via-black/10
      to-black/40
    "
      />

      <div
        className="
      hidden
      lg:block
      absolute
      top-8
      right-6
      max-w-[320px]
      text-right
      text-white

      lg:top-12
      lg:right-12
      lg:max-w-md
    "
      >
        <h2
          className="
        text-2xl
        font-hero
        sm:text-2xl
        lg:text-6xl
      "
        >
          Escape Into Stories
        </h2>

        <p
          className="
        mt-2
        text-sm
        sm:text-base
        lg:text-lg
        text-white/90
      "
        >
          Build your own cozy digital library.
        </p>
      </div>
    </section>
  );
}
