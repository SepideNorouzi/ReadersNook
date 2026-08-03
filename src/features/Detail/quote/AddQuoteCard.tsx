import { Plus, Quote as QuoteIcon } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function AddQuoteCard({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        flex
        min-h-[280px]
        w-full
        flex-col
        items-center
        justify-center
        gap-4
        overflow-hidden
        rounded-[28px]
        border-2
        border-dashed
        border-[var(--brown-300)]
        bg-gradient-to-br
        from-[var(--brown-50)]
        to-white
        shadow-[0_10px_30px_rgba(35,23,17,0.08)]
        hover:border-[var(--gold)]
        hover:shadow-[0_18px_40px_rgba(35,23,17,0.14)]
        hover:-translate-y-1
        p-6
        text-center
        shadow-[0_10px_30px_rgba(35,23,17,0.08)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[var(--gold)]
        hover:shadow-[0_18px_40px_rgba(35,23,17,0.14)]
      "
    >
      {/* Soft glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-32
          w-32
          rounded-full
          bg-[var(--gold-light)]/60
          blur-3xl
          transition-transform
          duration-500
          group-hover:scale-110
        "
      />

      {/* Decorative quote watermark */}
      <QuoteIcon
        className="
          pointer-events-none
          absolute
          right-6
          top-5
          h-20
          w-20
          text-[var(--gold)]
          opacity-[0.06]
        "
      />

      {/* Icon */}
      <div
        className="
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-[var(--gold-light)]
          shadow-sm
          transition-transform
          duration-300
          group-hover:scale-105
        "
      >
        <Plus className="h-7 w-7 text-[var(--gold)]" />
      </div>

      {/* Content */}
      <div className="relative">
        <h3
          className="
            text-lg
            font-semibold
            text-[var(--brown-900)]
          "
        >
          Add Quote
        </h3>

        <p
          className="
            mt-2
            max-w-[230px]
            text-sm
            leading-6
            text-[var(--text-secondary)]
          "
        >
          Save a passage from this book and revisit it whenever inspiration
          strikes.
        </p>
      </div>

      {/* Bottom accent */}
      <div
        className="
          absolute
          inset-x-8
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[var(--gold)]/50
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />
    </button>
  );
}
