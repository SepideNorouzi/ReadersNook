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
        min-h-[220px]
        w-full
        flex-col
        items-center
        justify-center
        gap-3
        overflow-hidden
        rounded-[22px]
        border-2
        border-dashed
        border-[var(--brown-300)]
        bg-gradient-to-br
        from-[var(--brown-50)]
        to-white
        p-4
        text-center
        shadow-[0_10px_30px_rgba(35,23,17,0.08)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[var(--gold)]
        hover:shadow-[0_18px_40px_rgba(35,23,17,0.14)]
        sm:min-h-[280px]
        sm:gap-4
        sm:rounded-[28px]
        sm:p-6
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
          h-14
          w-14
          text-[var(--gold)]
          opacity-[0.06]
          sm:h-20
          sm:w-20
        "
      />

      {/* Icon */}
      <div
        className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-[var(--gold-light)]
          shadow-sm
          transition-transform
          duration-300
          group-hover:scale-105
          sm:h-14
          sm:w-14
        "
      >
        <Plus className="h-5 w-5 text-[var(--gold)] sm:h-7 sm:w-7" />
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-base font-semibold text-[var(--brown-900)] sm:text-lg">
          Add Quote
        </h3>

        <p
          className="
            mt-1.5
            max-w-[210px]
            text-xs
            leading-5
            text-[var(--text-secondary)]
            sm:mt-2
            sm:max-w-[230px]
            sm:text-sm
            sm:leading-6
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