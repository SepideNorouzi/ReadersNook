import { Sparkles, X } from "lucide-react";

interface Props {
  onChoose: () => void;
  onDismiss: () => void;
}

export default function AvatarReminderToast({
  onChoose,
  onDismiss,
}: Props) {
  return (
    <div
      className="
        fixed
        top-5
        left-1/2
        z-50
        w-[calc(100%-3rem)]
        max-w-[320px]
        -translate-x-1/2
        animate-avatar-toast
        overflow-hidden
        rounded-2xl
        border border-[var(--gold)]/25
        bg-[var(--surface)]
        shadow-[var(--shadow-premium)]
      "
    >
      <div
        className="
          absolute inset-x-0 top-0
          h-1
          bg-gradient-to-r
          from-[var(--brown-500)]
          via-[var(--gold)]
          to-[var(--orange)]
        "
      />

      <div className="p-3">
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="
            absolute
            right-3
            top-3
            flex h-7 w-7
            items-center justify-center
            rounded-full
            text-[var(--text-muted)]
            transition
            hover:bg-[var(--brown-100)]
            hover:text-[var(--text)]
          "
        >
          <X size={15} />
        </button>

        <div className="flex gap-3 pr-6">
          <div
            className="
              flex h-10 w-10
              shrink-0
              items-center justify-center
              rounded-xl
              border border-[var(--gold)]/25
              bg-[var(--gold-light)]
              text-[var(--gold)]
            "
          >
            <Sparkles size={18} fill="currentColor" />
          </div>

          <div>
            <h3
              className="
                text-sm
                font-semibold
                text-[var(--text)]
              "
            >
              Make your profile yours ✨
            </h3>

            <p
              className="
                mt-1
                text-xs
                leading-relaxed
                text-[var(--text-secondary)]
              "
            >
              Pick a reader avatar to personalize your
              profile.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onChoose}
          className="
            mt-3
            w-full
            rounded-xl
            border border-[var(--gold)]/30
            bg-gradient-to-r
            from-[var(--gold)]
            to-[var(--brown-500)]
            px-4
            py-2.5
            text-xs
            font-bold
            text-[var(--brown-900)]
            shadow-[0_8px_20px_rgba(207,162,71,0.16)]
            transition
            duration-200
            hover:-translate-y-0.5
            hover:shadow-[var(--shadow-gold)]
            active:translate-y-0
          "
        >
          Choose my avatar
        </button>
      </div>
    </div>
  );
}