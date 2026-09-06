import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Library,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router";

import { useModeStore } from "../store/modeStore";

import "../styles/intro.css";

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
    <main className="intro-page relative min-h-screen overflow-hidden bg-[var(--stone-50)] text-[var(--text)]">
      {/* =========================================================
          Ambient background
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="intro-orb intro-orb-top" />
        <div className="intro-orb intro-orb-bottom" />
        <div className="intro-orb intro-orb-center" />
        <div className="intro-orb intro-orb-gold" />
        <div className="intro-orb intro-orb-sage" />

        <div className="intro-grid absolute inset-0 opacity-[0.035]" />

        <div className="intro-noise absolute inset-0 opacity-[0.025]" />
      </div>

      {/* =========================================================
          Navigation
      ========================================================== */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2.5 sm:gap-3"
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
            <BookOpen size={18} strokeWidth={1.8} />
          </div>

          <span className="font-heading text-base font-semibold tracking-[-0.02em] sm:text-lg">
            Reader's Nook
          </span>
        </button>

        <button
          onClick={handleSignUp}
          className="rounded-full px-3 py-2 text-xs font-semibold text-[var(--brown-700)] transition duration-300 hover:bg-[var(--brown-100)] sm:px-5 sm:text-sm"
        >
          Sign in
        </button>
      </header>

      {/* =========================================================
          Hero
      ========================================================== */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-7xl items-center px-5 pb-10 pt-6 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12 lg:pb-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* =====================================================
              Left content
          ====================================================== */}
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            {/* Eyebrow */}
            <div className="intro-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--brown-700)] shadow-sm backdrop-blur-xl sm:mb-7 sm:px-4 sm:text-xs">
              <Sparkles size={13} className="text-[var(--accent-gold)]" />
              <span>Your personal reading space</span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-[3.2rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              A quieter place
              <br />
              <span className="intro-shimmer text-[var(--brown-600)]">
                for your books.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:mt-7 sm:text-lg sm:leading-7">
              Reader's Nook helps you keep track of what you're reading,
              discover what comes next, and build a reading life that feels
              intentional.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row">
              <button
                onClick={handleDemo}
                className="intro-primary-button group flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold text-white hover:-translate-y-1 sm:h-auto sm:w-auto sm:py-3.5"
              >
                <span>Explore the demo</span>

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={handleSignUp}
                className="intro-secondary-button flex h-12 w-full items-center justify-center rounded-2xl border border-[var(--border)] bg-white/65 px-6 text-sm font-semibold text-[var(--text)] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:h-auto sm:w-auto sm:py-3.5"
              >
                Create your nook
              </button>
            </div>

            <p className="mt-4 text-[11px] text-[var(--text-muted)] sm:mt-5 sm:text-xs">
              Explore freely in demo mode, or create your own library.
            </p>
          </div>

          {/* =====================================================
              Right visual composition
          ====================================================== */}
          <div className="relative mx-auto mt-2 flex w-full max-w-lg justify-center lg:mt-0 lg:justify-end">
            {/* Large atmospheric glow */}
            <div className="intro-book-glow absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--accent-gold-soft)] via-[var(--brown-200)] to-[var(--accent-sage-soft)] blur-[80px] sm:h-80 sm:w-80" />

            {/* Secondary glow */}
            <div className="absolute left-[56%] top-[45%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

            {/* Book shadow */}
            <div className="absolute bottom-[2%] left-1/2 h-14 w-[190px] -translate-x-1/2 rounded-full bg-black/15 blur-2xl sm:w-[220px]" />

            {/* =================================================
                Main Book
            ================================================== */}
            <div className="intro-book relative h-[350px] w-[235px] rotate-[-5deg] rounded-[25px] bg-[var(--brown-800)] p-[6px] shadow-[0_35px_80px_rgba(60,35,25,0.28)] sm:h-[470px] sm:w-[315px] sm:rounded-[30px] sm:p-[7px]">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-[var(--brown-600)] via-[var(--brown-700)] to-[var(--brown-800)] p-6 text-white sm:rounded-[23px] sm:p-7">
                {/* Decorative rings */}
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/[0.08]" />
                <div className="absolute -right-9 -top-9 h-32 w-32 rounded-full border border-white/[0.08]" />
                <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border border-white/[0.08]" />

                {/* Soft shine */}
                <div className="intro-book-shine absolute inset-0" />

                <div className="relative">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 shadow-inner shadow-white/10 backdrop-blur sm:mb-8 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <BookOpen size={20} strokeWidth={1.5} />
                  </div>

                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/55 sm:text-xs">
                    Reader's Nook
                  </p>

                  <h2 className="mt-4 font-heading text-[2rem] font-semibold leading-[1.03] tracking-[-0.04em] sm:mt-5 sm:text-4xl">
                    Your stories.
                    <br />
                    Your shelf.
                  </h2>
                </div>

                <div className="relative">
                  <div className="mb-4 h-px w-full bg-white/15 sm:mb-5" />

                  <p className="max-w-[190px] text-[11px] leading-5 text-white/60 sm:max-w-[220px] sm:text-sm sm:leading-6">
                    Keep your reading journey in one beautiful little place.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                Current reading
            ================================================== */}
            <div className="intro-float-card absolute -bottom-2 -left-1 w-[155px] -rotate-[1deg] rounded-[17px] border border-white/70 bg-white/75 p-2.5 shadow-[0_20px_50px_rgba(60,35,25,0.15)] backdrop-blur-2xl sm:-bottom-4 sm:-left-8 sm:w-56 sm:rotate-[4deg] sm:rounded-2xl sm:p-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-9 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--brown-100)] sm:h-11 sm:w-9 sm:rounded-md">
                  <BookOpen
                    size={15}
                    className="text-[var(--brown-600)] sm:h-[18px] sm:w-[18px]"
                    strokeWidth={1.7}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-[10px] sm:tracking-wider">
                    Currently reading
                  </p>

                  <p className="mt-1 truncate font-heading text-[11px] font-semibold text-[var(--text)] sm:text-sm">
                    Your next chapter
                  </p>

                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[var(--stone-200)] sm:mt-2 sm:h-1.5">
                    <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[var(--brown-500)] to-[var(--accent-gold)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                Books count
            ================================================== */}
            <div className="intro-float-card absolute -right-1 top-2 rounded-[16px] border border-white/70 bg-white/75 px-3 py-2 shadow-[0_20px_50px_rgba(60,35,25,0.15)] backdrop-blur-2xl sm:-right-8 sm:top-8 sm:rounded-2xl sm:px-4 sm:py-3">
              <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-[10px] sm:tracking-wider">
                This year
              </p>

              <div className="mt-0.5 flex items-end gap-1">
                <span className="font-heading text-xl font-semibold text-[var(--accent-gold)] sm:text-2xl">
                  24
                </span>

                <span className="pb-0.5 text-[9px] text-[var(--text-secondary)] sm:pb-1 sm:text-xs">
                  books
                </span>
              </div>
            </div>

            {/* =================================================
                Tiny decorative badge
            ================================================== */}
            <div className="intro-mini-badge absolute -top-4 left-[12%] hidden rounded-full border border-white/80 bg-white/70 px-3 py-2 text-[10px] font-semibold text-[var(--brown-700)] shadow-lg backdrop-blur-xl sm:flex sm:items-center sm:gap-1.5">
              <Sparkles size={11} className="text-[var(--accent-gold)]" />
              Made for readers
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Feature strip
      ========================================================== */}
      <section className="relative z-10 px-5 pb-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl gap-2.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible">
          <div className="intro-feature-chip intro-feature-chip--gold min-w-[210px] flex-1 rounded-2xl border border-white/60 bg-white/35 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
            <div className="flex items-center gap-2.5">
              <BookOpen
                size={15}
                className="text-[var(--accent-gold)]"
                strokeWidth={1.7}
              />

              <p className="font-heading text-xs font-semibold sm:text-sm">
                Track your reading
              </p>
            </div>

            <p className="mt-1 hidden text-xs leading-5 text-[var(--text-secondary)] sm:block">
              Know what you're reading and where you left off.
            </p>
          </div>

          <div className="intro-feature-chip intro-feature-chip--sage min-w-[210px] flex-1 rounded-2xl border border-white/60 bg-white/35 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
            <div className="flex items-center gap-2.5">
              <Library
                size={15}
                className="text-[var(--accent-sage)]"
                strokeWidth={1.7}
              />

              <p className="font-heading text-xs font-semibold sm:text-sm">
                Build your library
              </p>
            </div>

            <p className="mt-1 hidden text-xs leading-5 text-[var(--text-secondary)] sm:block">
              Keep the books you've read and the ones waiting for you.
            </p>
          </div>

          <div className="intro-feature-chip intro-feature-chip--terracotta min-w-[210px] flex-1 rounded-2xl border border-white/60 bg-white/35 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
            <div className="flex items-center gap-2.5">
              <Bookmark
                size={15}
                className="text-[var(--accent-terracotta)]"
                strokeWidth={1.7}
              />

              <p className="font-heading text-xs font-semibold sm:text-sm">
                Make reading yours
              </p>
            </div>

            <p className="mt-1 hidden text-xs leading-5 text-[var(--text-secondary)] sm:block">
              Set goals, save favorites, and make your nook personal.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
