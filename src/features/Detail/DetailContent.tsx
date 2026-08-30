import { useState } from "react";
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
  const [aestheticImages, setAestheticImages] = useState(
    book.aestheticImages
  );

  function handleRemoveImage(url: string) {
    setAestheticImages((prev) =>
      prev.filter((image) => image !== url)
    );
  }

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

      <Aesthetic
        images={aestheticImages}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
}