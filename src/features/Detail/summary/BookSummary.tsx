import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function BookSummary({ book }: Props) {
  return (
    <section
      className="
      px-6
      lg:pt-5
      pb-20
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
        lg:p-10
        shadow-sm
        "
      >
        <p
          className="
          mb-3
          text-xs
          uppercase
          tracking-[0.3em]
          text-stone-500
          "
        >
          About the Book
        </p>

        <h2
          className="
                font-serif
                text-2xl
                text-brown-900
                sm:text-3xl
              "
        >
          Summary
        </h2>

        <div
          className="
          mt-5
          space-y-6
          text-[15px]
          lg:text-lg
          leading-9
          text-stone-600
          "
        >
          {book.summary
            .split("\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </section>
  );
}
