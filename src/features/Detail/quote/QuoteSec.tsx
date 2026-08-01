import { Heart, Plus, Quote } from "lucide-react";

import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function QuoteSec({ book }: Props) {
  return (
    <section
      className="
        px-15
        pb-20
      "
    >
      <div className="max-w-6xl mx-auto">
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

        {/* Grid */}
        <div
          className="
            mt-10
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {book.quotes.map((quote) => (
            <article
              key={quote.id}
              className="
                flex
                flex-col
                justify-between
                rounded-[28px]
                border
                border-stone-200
                bg-white
                p-8
                shadow-sm
                transition-all
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <Quote
                className="
                  h-8
                  w-8
                  text-[#C68B3C]
                "
              />

              <p
                className="
                  mt-6
                  text-lg
                  leading-8
                  text-stone-700
                "
              >
                “{quote.text}”
              </p>

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
                    fill-pink-500 text-pink-500
                  "
                />
              </div>
            </article>
          ))}

          {/* Add Quote Card */}

          <button
            className="
              flex
              min-h-[280px]
              flex-col
              items-center
              justify-center
              gap-4
              rounded-[28px]
              border-2
              border-dashed
              border-[#D8C6AF]
              bg-[#FCFAF7]
              transition-all
              hover:border-[#C68B3C]
              hover:bg-[#FFFDFB]
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#EFE2D0]
              "
            >
              <Plus
                className="
                  h-7
                  w-7
                  text-[#9C6A2B]
                "
              />
            </div>

            <h3
              className="
                font-medium
                text-lg
                text-brown-900
              "
            >
              Add Quote
            </h3>

            <p
              className="
                max-w-[220px]
                text-center
                text-sm
                leading-6
                text-stone-500
              "
            >
              Save a passage from this book and revisit it whenever inspiration
              strikes.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
