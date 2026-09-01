import type { Book } from "../../../types/book";

import QuoteEmbla from "./QuoteEmbla";

interface Props {
  book: Book;
}

export default function QuoteSec({ book }: Props) {
  return (
    <section
      className="
         px-5
        pb-16

        sm:px-8
        sm:pb-15

        lg:px-12
        lg:pb-0
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
                font-serif
                text-2xl
                text-brown-900
                sm:text-3xl
              "
          >
            Quotes
          </h2>

        
        </div>

        {/* Embla Carousel */}
        <div className="mt-5">
          <QuoteEmbla book={book} />
        </div>
      </div>
    </section>
  );
}
