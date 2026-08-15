import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

import { useModeStore } from "../store/modeStore";

export default function Intro() {
  const navigate = useNavigate();
  const setMode = useModeStore((state) => state.setMode);

  const handleDemo = () => {
    setMode("demo");
    navigate("/dashboard");
  };

  const handleSignUp = () => {
    setMode("admin");
    navigate("/auth");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--stone-50)] text-[var(--text)]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--brown-200)] opacity-30 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--brown-100)] opacity-40 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-white opacity-50 blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brown-600)] text-white shadow-lg shadow-[var(--brown-600)]/20 transition-transform duration-300 group-hover:-rotate-3">
            <BookOpen size={20} strokeWidth={1.8} />
          </div>

          <span className="font-heading text-lg font-semibold tracking-tight">
            Reader's Nook
          </span>
        </button>

        <button
          onClick={handleSignUp}
          className="hidden rounded-full px-5 py-2.5 text-sm font-medium text-[var(--brown-700)] transition hover:bg-[var(--brown-100)] sm:block"
        >
          Sign in
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl items-center px-6 pb-16 pt-10 sm:px-10 lg:px-12 lg:pb-24">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Left side */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-4 py-2 text-xs font-medium text-[var(--brown-700)] shadow-sm backdrop-blur">
              <Sparkles size={14} />
              <span>Your personal reading space</span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--text)] sm:text-6xl lg:text-7xl">
              A quieter place
              <br />
              <span className="text-[var(--brown-600)]">for your books.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
              Reader's Nook helps you keep track of what you're reading,
              discover what comes next, and build a reading life that feels
              intentional.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleDemo}
                className="group flex items-center justify-center gap-2 rounded-2xl bg-[var(--brown-600)] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[var(--brown-600)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--brown-700)] hover:shadow-2xl"
              >
                Explore the demo
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={handleSignUp}
                className="rounded-2xl border border-[var(--border)] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[var(--text)] shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
              >
                Create your nook
              </button>
            </div>

            {/* Small reassurance */}
            <p className="mt-5 text-xs text-[var(--text-muted)]">
              Explore freely in demo mode, or create your own library.
            </p>
          </div>

          {/* Right side: book composition */}
          <div className="relative mx-auto flex w-full max-w-lg justify-center lg:justify-end">
            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brown-200)] opacity-40 blur-3xl" />

            {/* Main book */}
            <div className="relative h-[430px] w-[290px] rotate-[-4deg] rounded-[28px] bg-[var(--brown-700)] p-5 shadow-2xl shadow-black/20 transition-transform duration-700 hover:rotate-[-2deg] sm:h-[470px] sm:w-[315px]">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-[var(--brown-600)] to-[var(--brown-800)] p-7 text-white">
                {/* Decorative circles */}
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/10" />
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/10" />
                <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border border-white/10" />

                <div className="relative">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                    <BookOpen size={23} strokeWidth={1.5} />
                  </div>

                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    Reader's Nook
                  </p>

                  <h2 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-tight">
                    Your stories.
                    <br />
                    Your shelf.
                  </h2>
                </div>

                <div className="relative">
                  <div className="mb-5 h-px w-full bg-white/15" />

                  <p className="max-w-[220px] text-sm leading-6 text-white/65">
                    Keep your reading journey in one beautiful little place.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating current-reading card */}
            <div className="absolute -bottom-4 -left-2 w-52 rotate-[4deg] rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur-xl sm:-left-8 sm:w-56">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--brown-100)]">
                  <BookOpen
                    size={18}
                    className="text-[var(--brown-600)]"
                    strokeWidth={1.7}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Currently reading
                  </p>

                  <p className="mt-1 truncate font-heading text-sm font-semibold text-[var(--text)]">
                    Your next chapter
                  </p>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--stone-200)]">
                    <div className="h-full w-[68%] rounded-full bg-[var(--brown-500)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating books count card */}
            <div className="absolute -right-1 top-8 rotate-[5deg] rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-8">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                This year
              </p>

              <div className="mt-1 flex items-end gap-1">
                <span className="font-heading text-2xl font-semibold text-[var(--brown-700)]">
                  24
                </span>

                <span className="pb-1 text-xs text-[var(--text-secondary)]">
                  books
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom feature strip */}
      <section className="relative z-10 border-t border-[var(--border)] bg-white/30 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[var(--border)] px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-10 lg:px-12">
          <div className="px-0 py-6 sm:px-8">
            <p className="font-heading text-sm font-semibold">
              Track your reading
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
              Know what you're reading and where you left off.
            </p>
          </div>

          <div className="px-0 py-6 sm:px-8">
            <p className="font-heading text-sm font-semibold">
              Build your library
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
              Keep the books you've read and the ones waiting for you.
            </p>
          </div>

          <div className="px-0 py-6 sm:px-8">
            <p className="font-heading text-sm font-semibold">
              Make reading yours
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
              Set goals, save favorites, and make your nook personal.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
