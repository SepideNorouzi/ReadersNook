import type { Book } from "../../../types/book";

import QuoteEmbla from "./QuoteEmbla";

interface Props {
  book: Book;
}

export default function QuoteSec({ book }: Props) {
  return (
    <section
      className="
        px-15
      "
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-stone-500
            "
          >
            Favorite Passages
          </p>

          <h2
            className="
              mt-3
              font-serif
              text-4xl
              text-brown-900
            "
          >
            Quotes
          </h2>

          <p
            className="
              mt-3
              max-w-xl
              text-stone-500
            "
          >
            Memorable passages, beautiful lines, and thoughts that stay with you
            long after closing the book.
          </p>
        </div>

        {/* Embla Carousel */}
        <div className="mt-5">
          <QuoteEmbla book={book} />
        </div>
      </div>
    </section>
  );
}
