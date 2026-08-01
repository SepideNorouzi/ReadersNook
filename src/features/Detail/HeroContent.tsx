import type { Book } from "../../types/book";
import { ChevronDown } from "lucide-react";

interface Props {
  book: Book;
}

export default function HeroContent({ book }: Props) {
  return (
    <section
      className="
      px-6
      pt-28
      pb-20

      lg:px-10
      lg:pt-20
      "
    >
      <div className="max-w-3xl">
        <h1
          className="
          mt-4

          font-serif

          text-5xl
          lg:text-7xl

          text-brown-900
          "
        >
          {book.title}
        </h1>

        {/* Author + Status */}
        <div
          className="
          mt-5

          flex
          items-center
          justify-between

          gap-6

          flex-wrap
          "
        >
          <p
            className="
            text-xl
            lg:text-2xl

            text-stone-600
            "
          >
            {book.author}
          </p>

          <button
            className="
            group

            inline-flex
            items-center
            gap-2

            rounded-full

            border
            border-[#E7DED5]

            bg-[#FBF8F4]

            px-3.5
            py-1.5

            text-sm

            shadow-sm

            transition-all

            hover:border-[#C9B39A]
            hover:bg-white
            "
          >
            <span
              className="
              h-2
              w-2

              rounded-full

              bg-[#C68B3C]
              "
            />

            <span className="font-medium text-stone-700">
              Currently Reading
            </span>

            <ChevronDown
              className="
              h-3.5
              w-3.5

              text-stone-500

              transition-transform

              group-hover:rotate-180
              "
            />
          </button>
        </div>

        {/* Divider */}
        <div
          className="
          mt-8

          border-t

          border-stone-200
          "
        />
      </div>
    </section>
  );
}
