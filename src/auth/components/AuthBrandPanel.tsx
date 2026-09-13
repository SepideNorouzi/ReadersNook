import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router";

export default function AuthBrandPanel() {
  const navigate = useNavigate();

  return (
    <aside
      className="
        relative hidden
        w-[43%]
        overflow-hidden
        bg-gradient-to-br
        from-[var(--brown-800)]
        via-[var(--brown-900)]
        to-[#1c130e]
        p-10
        text-[var(--sidebar-text)]
        lg:flex
        lg:flex-col
        lg:justify-between
      "
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -top-20 -right-16
          h-64 w-64
          rounded-full
          bg-[var(--gold)]/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-24 -left-20
          h-72 w-72
          rounded-full
          bg-[var(--orange)]/8
          blur-3xl
        "
      />

      {/* Brand */}
      <div className="relative">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            group mb-15
            flex items-center gap-2.5 sm:gap-3
          "
        >
          <div
            className="
              flex h-10 w-10
              shrink-0
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[var(--sidebar-accent-start)]
              to-[var(--sidebar-accent-end)]
              text-white
              shadow-[0_12px_30px_rgba(54,35,27,.28),inset_0_1px_1px_rgba(255,255,255,.18)]
              transition-all duration-200 ease-out
              hover:-translate-y-0.5
              hover:shadow-[0_14px_34px_rgba(54,35,27,.34),inset_0_1px_1px_rgba(255,255,255,.2)]
              active:translate-y-0
              active:scale-95
            "
          >
            <BookOpen size={18} strokeWidth={1.8} />
          </div>

          <span
            className="
              font-heading
              text-base font-semibold
              tracking-[-0.02em]
              sm:text-lg
            "
          >
            Reader's Nook
          </span>
        </button>

        <h2
          className="
            max-w-sm
            font-heading
            text-4xl
            font-semibold
            leading-tight
            text-[var(--sidebar-text)]
          "
        >
          A quieter place for your reading life.
        </h2>
      </div>

      {/* Quote */}
      <div className="relative">
        <div
          className="
            mb-6 h-px w-16
            bg-gradient-to-r
            from-[var(--gold)]
            to-transparent
          "
        />

        <p
          className="
            max-w-xs
            font-heading
            text-lg
            italic
            leading-relaxed
            text-[var(--sidebar-text)]
          "
        >
          “There is always one more story worth getting lost in.”
        </p>

        <p
          className="
            mt-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[var(--sidebar-text-muted)]
          "
        >
          Your personal reading nook
        </p>
      </div>

      {/* Decorative books */}
      <div
        aria-hidden="true"
        className="
          absolute bottom-12 right-8
          flex items-end gap-1
          opacity-30
        "
      >
        <div className="h-20 w-3 rounded-sm bg-[var(--gold)]" />
        <div className="h-28 w-3 rounded-sm bg-[var(--brown-400)]" />
        <div className="h-24 w-3 rounded-sm bg-[var(--orange)]" />
        <div className="h-32 w-3 rounded-sm bg-[var(--gold)]/60" />
      </div>
    </aside>
  );
}
