import type { Book } from "../../../types/book";

import QuoteEmbla from "./QuoteEmbla";
import SectionHeading from "../SectionHeading";

interface Props {
  book: Book;
}

export default function QuoteSec({ book }: Props) {
  return (
    <section
      className="
        px-6
        pt-4
        pb-16

        sm:px-8

        lg:px-10
        lg:pt-6
        lg:pb-0
      "
    >
      <div className="max-w-3xl">
        <SectionHeading eyebrow="Favorite Passages" title="Quotes" />

        {/* Embla Carousel */}
        <div className="mt-5">
          <QuoteEmbla book={book} />
        </div>
      </div>
    </section>
  );
}