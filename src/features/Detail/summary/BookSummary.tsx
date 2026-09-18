import type { Book } from "../../../types/book";
import SectionHeading from "../SectionHeading";

interface Props {
  book: Book;
}

export default function BookSummary({ book }: Props) {
  // since genre is optional, the [] stops the app from crashing
  const genres = book.genres ?? [];

  return (
    <section
      className="
        px-6
        pt-8
        pb-20
        sm:px-8
        lg:px-10
        lg:pt-15
      "
    >
      <div
        className="
          max-w-3xl
          rounded-[30px]
          border
          border-stone-300
          bg-white
          p-8
          shadow-sm
          lg:p-10
        "
      >
        <SectionHeading eyebrow="About the Book" title="Summary" />

        <div
          className="
            mt-5
            space-y-6
            text-[15px]
            leading-9
            text-stone-600
            lg:text-lg
          "
        >
          {book.summary
            .split("\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        {genres.length > 0 && (
          <ul
            role="list"
            className="
              mt-9
              flex
              flex-wrap
              gap-3
            "
          >
            {genres.map((genre) => (
              <li
                key={genre}
                className="
                  relative
                  flex
                  min-h-8
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-3xl
                  border
                  border-[#dfcfae]
                  bg-gradient-to-br
                  from-[#fffdf8]
                  via-[#f3e8d3]
                  to-[#d1b47a]
                  px-4
                  py-1
                  text-center
                  text-[11px]
                  font-semibold
                  tracking-[0.08em]
                  text-[#5a4031]
                  shadow-[0_4px_12px_rgba(90,64,49,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_7px_16px_rgba(90,64,49,0.16),inset_0_1px_0_rgba(255,255,255,0.95)]
                "
              >
                <span
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-1/2
                    bg-gradient-to-b
                    from-white/50
                    to-transparent
                  "
                />

                <span className="relative z-10">{genre}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
