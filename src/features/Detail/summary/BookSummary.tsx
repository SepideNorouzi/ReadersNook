import type { Book } from "../../../types/book";
import SectionHeading from "../SectionHeading";

interface Props {
  book: Book;
}

export default function BookSummary({ book }: Props) {
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
        lg:p-10
        shadow-sm
        "
      >
        <SectionHeading eyebrow="About the Book" title="Summary" />

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