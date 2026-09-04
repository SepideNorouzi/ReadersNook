import { BookOpen, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

function Progress() {
  const navigate = useNavigate();

  return (
    <main
      className="
        relative
        flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-[var(--bg)]
        px-5
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -top-24 left-1/2
          h-72 w-72
          -translate-x-1/2
          rounded-full
          bg-[var(--gold)]/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-24 -right-24
          h-72 w-72
          rounded-full
          bg-[var(--orange)]/8
          blur-3xl
        "
      />

      <section
        className="
          relative
          w-full max-w-md
          rounded-[28px]
          border border-[var(--brown-200)]
          bg-gradient-to-br
          from-[var(--surface)]
          via-[var(--surface)]
          to-[var(--brown-50)]
          p-7
          text-center
          shadow-[var(--shadow-premium)]
          sm:p-9
        "
      >
        {/* Icon */}
        <div
          className="
            mx-auto mb-5
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            border border-[var(--gold)]/25
            bg-[var(--gold-light)]
            text-[var(--gold)]
            shadow-[var(--shadow-gold)]
          "
        >
          <BookOpen size={28} />
        </div>

        {/* Eyebrow */}
        <div
          className="
            mb-2
            flex items-center justify-center gap-1.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[var(--gold)]
          "
        >
          <Sparkles size={12} fill="currentColor" />
          Reader's Nook
        </div>

        <h1
          className="
            font-heading
            text-2xl
            font-semibold
            text-[var(--text)]
            sm:text-3xl
          "
        >
          Authentication is in progress
        </h1>

        <p
          className="
            mx-auto mt-3
            max-w-sm
            text-sm
            leading-relaxed
            text-[var(--text-secondary)]
          "
        >
          We're still putting the finishing touches on
          account authentication. You can explore the app
          and test its features using demo mode for now.
        </p>

        {/* Progress indicator */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide">
            <span className="text-[var(--text-muted)]">
              Authentication
            </span>

            <span className="text-[var(--gold)]">
              In progress
            </span>
          </div>

          <div
            className="
              h-2
              overflow-hidden
              rounded-full
              bg-[var(--brown-100)]
            "
          >
            <div
              className="
                h-full
                w-2/3
                rounded-full
                bg-gradient-to-r
                from-[var(--brown-500)]
                via-[var(--gold)]
                to-[var(--orange)]
              "
            />
          </div>
        </div>

        {/* Demo button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            mt-7
            w-full
            rounded-xl
            border border-[var(--gold)]/30
            bg-gradient-to-r
            from-[var(--gold)]
            to-[var(--brown-500)]
            px-5
            py-3
            text-sm
            font-bold
            text-[var(--brown-900)]
            shadow-[0_10px_24px_rgba(207,162,71,0.16)]
            transition
            duration-200
            hover:-translate-y-0.5
            hover:shadow-[var(--shadow-gold)]
            active:translate-y-0
          "
        >
          Continue with Demo
        </button>

        <p className="mt-4 text-[11px] text-[var(--text-muted)]">
          Your demo data stays separate from real accounts.
        </p>
      </section>
    </main>
  );
}

export default Progress;