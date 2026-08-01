import type { Book } from "../../types/book";

import HeroContent from "./HeroContent";
import BookSummary from "./BookSummary";

interface Props {
  book: Book;
}

export default function DetailContent({ book }: Props) {
  return (
    <div
      className="
      min-w-0

      pb-24

      lg:pl-40
      "
    >
      <HeroContent book={book} />

      <BookSummary book={book} />

      {/* Quotes Section */}

      {/* Gallery Section */}
    </div>
  );
}
