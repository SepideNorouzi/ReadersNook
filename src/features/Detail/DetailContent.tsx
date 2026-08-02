import type { Book } from "../../types/book";

import HeroContent from "./hero/HeroContent";
import BookSummary from "./summary/BookSummary";
import QuoteSec from "./quote/QuoteSec";
import BookStats from "./stats/BookStats";
import Aesthetic from "./aesthetic/Aesthetic";

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
      <Aesthetic bookId={book.id} />
    </div>
  );
}
