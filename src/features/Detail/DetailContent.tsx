import type { Book } from "../../types/book";

import HeroContent from "./hero/HeroContent";
import BookSummary from "./summary/BookSummary";
import QuoteSec from "./quote/QuoteSec";
import BookStats from "./stats/BookStats";

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
      <BookStats book={book} />
      <BookSummary book={book} />
      <QuoteSec book={book} />

      {/* Quotes Section */}

      {/* Gallery Section */}
    </div>
  );
}
