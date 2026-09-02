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
      {/* ================= MOBILE ================= */}

      <div className="flex h-full min-h-0 flex-col justify-between lg:hidden">
        <div>
          <span
            className="
              block

              font-serif
              text-5xl
              leading-none

              text-[var(--brown-600)]

              drop-shadow-[0_0_8px_rgba(207,162,71,0.18)]
            "
          >
            “
          </span>

          <blockquote
            className="
              mt-2

              line-clamp-4

              max-w-[34ch]

              font-heading
              text-[13px]
              font-semibold
              italic
              leading-[1.65]

              text-[var(--brown-900)]

              drop-shadow-[0_1px_2px_rgba(255,255,255,0.35)]

              sm:text-[14px]
            "
          >
            {quote.text}
          </blockquote>
        </div>

        <div className="mt-4">
          <div
            className="
              mb-3
              h-px

              bg-gradient-to-r
              from-[var(--gold)]/60
              via-[var(--orange)]/25
              to-transparent
            "
          />

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.16em]

              text-[var(--brown-500)]
            "
          >
            From your library
          </p>

          <p
            className="
              mt-1
              max-w-[80%]
              truncate

              font-heading
              text-xs
              font-semibold

              text-[var(--brown-700)]
            "
          >
            {quote.bookTitle}
          </p>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden h-full min-h-0 flex-col justify-between lg:flex">
        <div>
          <span
            className="
              block

              font-serif
              text-8xl
              leading-[0.65]

              text-[var(--brown-600)]

              drop-shadow-[0_0_10px_rgba(207,162,71,0.18)]
            "
          >
            “
          </span>

          <blockquote
            className="
              mt-5

              max-w-[28ch]

              font-heading
              text-xl
              font-semibold
              italic
              leading-[1.65]

              text-[var(--brown-900)]

              drop-shadow-[0_1px_2px_rgba(255,255,255,0.35)]
            "
          >
            {quote.text}
          </blockquote>
        </div>

        <div className="mt-6">
          <div
            className="
              mb-4
              h-px

              bg-gradient-to-r
              from-[var(--gold)]/55
              via-[var(--orange)]/25
              to-transparent
            "
          />

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.18em]

                  text-[var(--brown-500)]
                "
              >
                From your library
              </p>

              <p
                className="
                  mt-1
                  max-w-[24ch]
                  truncate

                  font-heading
                  text-sm
                  font-semibold

                  text-[var(--brown-700)]
                "
              >
                {quote.bookTitle}
              </p>
            </div>

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-full

                border
                border-[rgba(207,162,71,0.25)]

                bg-gradient-to-br
                from-[var(--gold-light)]
                to-[var(--orange-light)]

                text-[var(--brown-700)]

                shadow-[
                  0_6px_16px_rgba(164,125,93,0.12),
                  0_0_12px_rgba(207,162,71,0.10)
                ]
              "
            >
              ✦
            </div>
          </div>
        </div>
      </div>
    </>
  );
}