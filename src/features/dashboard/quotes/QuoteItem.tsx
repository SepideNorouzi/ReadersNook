interface Props {
  quote: {
    id: string;
    text: string;
    bookTitle: string;
  };
}

export default function QuoteItem({ quote }: Props) {
  return (
    <>
      {/* ======================= MOBILE ======================= */}

      <div className="flex h-full flex-col justify-between lg:hidden">
        <div>
          <span
            className="
              mb-1
              block

              font-heading
              text-4xl
              leading-none

              text-[var(--stone-300)]
            "
          >
            ❝
          </span>

          <blockquote
            className="
              line-clamp-4

              text-left

              font-heading
              text-sm
              italic
              leading-relaxed

              text-[var(--text)]
            "
          >
            {quote.text}
          </blockquote>
        </div>

        <div className="mt-4 flex justify-end">
          <span
            className="
              rounded-full

              border
              border-[var(--border)]

              bg-[var(--stone-100)]

              px-3
              py-1

              text-[11px]
              font-medium

              text-[var(--brown-700)]
            "
          >
            📖 {quote.bookTitle}
          </span>
        </div>
      </div>

      {/* ======================= DESKTOP ======================= */}

      <div className="hidden h-full flex-col justify-between lg:flex">
        <div>
          <span
            className="
              mb-2
              block

              font-heading
              text-5xl
              leading-none

              text-[var(--stone-300)]
            "
          >
            ❝
          </span>

          <blockquote
            className="
              max-w-[30ch]

              text-left

              font-heading
              text-lg
              italic
              leading-relaxed

              text-[var(--text)]
            "
          >
            {quote.text}
          </blockquote>
        </div>

        <div className="mt-6 flex justify-center">
          <span
            className="
              rounded-full

              border
              border-[var(--border)]

              bg-[var(--stone-100)]

              px-3.5
              py-1.5
              text-[10px]
              lg:text-[12px]
              font-medium

              text-[var(--brown-700)]
            "
          >
            ✨ {quote.bookTitle}
          </span>
        </div>
      </div>
    </>
  );
}
