import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

import { useModeStore } from "../store/modeStore";
import intro from "../assets/intro.jpg";

export default function Intro() {
  const navigate = useNavigate();
  const setMode = useModeStore((state) => state.setMode);

  const handleDemo = () => {
    setMode("demo");
    navigate("/dashboard");
  };

  const handleSignUp = () => {
    navigate("/progress");
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}
      <div className="absolute inset-0">
        <img
          src={intro}
          alt=""
          aria-hidden="true"
          className="
            h-full
            w-full
            object-cover
            object-center

            sm:object-[75%_center]
          "
        />

        {/* =================================================
            DESKTOP SCRIM
        ================================================== */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/85
            via-black/15
            to-transparent

            sm:block
          "
        />

        {/* =================================================
            MOBILE SCRIM

            Stronger toward the bottom because the content
            is moved down on small screens.
        ================================================== */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/20
            via-black/10
            to-black/75

            sm:hidden
          "
        />

        {/* Additional mobile bottom fade */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[60%]
            bg-gradient-to-t
            from-black/70
            via-black/25
            to-transparent

            sm:hidden
          "
        />
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <header
        className="
          relative
          z-20
          mx-auto
          flex
          w-full
          max-w-7xl
          items-center
          justify-between

          px-5
          py-5

          sm:px-10
          sm:py-6

          lg:px-12
        "
      >
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="intro-nav-item group flex items-center gap-3"
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
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
              text-base
              font-semibold
              tracking-tight
              text-white

              sm:text-lg
            "
          >
            Reader's Nook
          </span>
        </button>

        {/* Sign in */}
        <button
          onClick={handleSignUp}
          className="
            rounded-full
            px-2
            py-2
            text-sm
            font-medium
            text-white/80
            transition

            hover:text-white

            sm:px-5
            sm:py-2.5
          "
        >
          Sign in
        </button>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section
        className="
    relative
    z-10
    mx-auto
    flex
    min-h-[calc(100svh-80px)]
    w-full
    max-w-7xl
    flex-col

    px-5
    pt-20
    pb-8

    sm:min-h-[calc(100vh-88px)]
    sm:justify-center
    sm:px-10
    sm:pb-12
    sm:pt-0

    lg:px-12
  "
      >
        {/* =====================================================
      MOBILE / DESKTOP HERO CONTENT
  ====================================================== */}
        <div
          className="
      flex
      min-h-[calc(100svh-110px)]
      flex-col

      sm:min-h-0
      sm:block
    "
        >
          {/* ===================================================
        TEXT
    ==================================================== */}
          <div
            className="
        max-w-full

        sm:max-w-2xl
      "
          >
            {/* Eyebrow */}
            <div
              className="
          intro-reveal
          mb-5
          flex
          items-center
          gap-3

          sm:mb-7
        "
            >
              <div
                className="
            flex
            items-center
            gap-2
            rounded-full

            border
            border-white/10

            bg-white/[0.06]

            px-3
            py-1.5

            shadow-[0_10px_40px_rgba(0,0,0,0.2)]

            backdrop-blur-xl

            sm:px-4
            sm:py-2
          "
              >
                <Sparkles
                  size={13}
                  className="shrink-0 text-[#e4aa83]"
                  strokeWidth={1.8}
                />

                <span
                  className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/75

              sm:text-[11px]
              sm:tracking-[0.28em]
            "
                >
                  Your reading journey, reimagined
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1
              className="
          intro-reveal
          intro-delay-1
          font-heading
          font-semibold
          leading-[0.98]
          tracking-[-0.045em]
          text-white

          text-[2.7rem]

          sm:text-6xl

          lg:text-[5.5rem]
        "
            >
              A quieter place
              <br />
              <span className="intro-gradient-text">for your books.</span>
            </h1>

            {/* Description */}
            <p
              className="
          intro-reveal
          intro-delay-2
          mt-5
          max-w-[350px]
          text-sm
          leading-6
          text-white/75

          sm:mt-7
          sm:max-w-xl
          sm:text-lg
          sm:leading-8
        "
            >
              Reader's Nook helps you keep track of what you're reading,
              discover what comes next, and build a reading life that feels
              intentional.
            </p>
          </div>

          {/* ===================================================
        BUTTONS

        Mobile:
        anchored to bottom

        Desktop:
        returns to normal flow
    ==================================================== */}
          <div
            className="
        intro-reveal
        intro-delay-3

        mt-auto
        w-full

        flex
        flex-col
        gap-3

        pt-8

        sm:mt-10
        sm:w-auto
        sm:flex-row
        sm:pt-0
      "
          >
            {/* Primary */}
            <button
              onClick={handleDemo}
              className="
          group
          relative
          flex
          min-h-12
          w-full
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-2xl

          border
          border-[#efc5a2]/30

          bg-gradient-to-br
          from-[#bd7656]
          via-[#965038]
          to-[#64291f]

          px-6
          py-3.5

          text-sm
          font-semibold
          text-white

          shadow-[0_12px_35px_rgba(116,52,32,0.45),inset_0_1px_0_rgba(255,255,255,0.22)]

          transition-all
          duration-500

          hover:-translate-y-1

          hover:shadow-[0_18px_45px_rgba(143,75,48,0.55),0_0_30px_rgba(195,119,82,0.18)]

          sm:w-auto
        "
            >
              <span
                className="
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent

            transition-transform
            duration-700

            group-hover:translate-x-full
          "
              />

              <span className="relative">Explore the demo</span>

              <ArrowRight
                size={17}
                className="
            relative
            transition-transform
            duration-300

            group-hover:translate-x-1
          "
              />
            </button>

            {/* Secondary */}
            <button
              onClick={handleSignUp}
              className="
          group
          relative
          flex
          min-h-12
          w-full
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-2xl

          border
          border-white/20

          bg-white/[0.08]

          px-6
          py-3.5

          text-sm
          font-semibold
          text-white

          shadow-[0_10px_35px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.12)]

          backdrop-blur-xl

          transition-all
          duration-500

          hover:-translate-y-1
          hover:border-white/30
          hover:bg-white/[0.13]

          hover:shadow-[0_16px_45px_rgba(0,0,0,0.32)]

          sm:w-auto
        "
            >
              <span className="relative z-10">Create your nook</span>

              <span
                className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            via-white/[0.07]
            to-transparent

            opacity-0

            transition-opacity
            duration-500

            group-hover:opacity-100
          "
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
