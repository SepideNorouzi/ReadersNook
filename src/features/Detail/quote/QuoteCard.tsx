import { Heart, Quote as QuoteIcon } from "lucide-react";

import type { Quote } from "../../../types/quote";

interface Props {
  quote: Quote;
}

export default function QuoteCard({ quote }: Props) {
  return (
    <article
      className="
        flex
        h-full
        min-h-[280px]
        flex-col
        justify-between
        rounded-[28px]
        border
        border-stone-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Quote Icon */}
      <QuoteIcon
        className="
          h-5
          w-5
          text-[#C68B3C]
        "
      />

      {/* Quote */}
      <p
        className="
          mt-6
          flex-1
          text-lg
          leading-8
          text-stone-700
        "
      >
        “{quote.text}”
      </p>

      {/* Footer */}
      <div
        className="
          mt-8
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            rounded-full
            bg-stone-100
            px-3
            py-1
            text-sm
            text-stone-600
          "
        >
          Page {quote.page}
        </span>

        <Heart
          className="
            h-5
            w-5
            fill-pink-300 text-pink-500
            "
        />
      </div>
    </article>
  );
}
