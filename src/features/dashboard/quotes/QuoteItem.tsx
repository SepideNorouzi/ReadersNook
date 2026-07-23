interface Props {
  quote: {
    id: string;
    text: string;
    bookTitle: string;
  };
}

export default function QuoteItem({ quote }: Props) {
  return (
    <div
      className="
        flex
        flex-1
        flex-col
        items-center
        justify-center

        text-center
      "
    >
      <span
        className="
          mb-4

          font-heading
          text-6xl
          leading-none

          text-[var(--stone-300)]
        "
      >
        ❝
      </span>

      <blockquote
        className="
          max-w-[24ch]

          font-heading
          text-lg
          italic
          leading-relaxed

          text-[var(--text)]
        "
      >
        {quote.text}
      </blockquote>

      <div className="my-6 h-px w-12 bg-[var(--border)]" />

      <p
        className="
          text-sm

          font-medium

          text-[var(--brown-700)]
        "
      >
        {quote.bookTitle}
      </p>
    </div>
  );
}