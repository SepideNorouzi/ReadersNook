import { useState } from "react";
import type { Book } from "../../types/book";

import HeroContent from "./hero/HeroContent";
import BookSummary from "./summary/BookSummary";
import QuoteSec from "./quote/QuoteSec";
import BookStats from "./stats/BookStats";
import Aesthetic from "./aesthetic/Aesthetic";
import AddToLibrary from "./AddToLibrary";
import type { BookSearchResult } from "../../types/searchResults";

interface Props {
  book: Book;
  searchResult?: BookSearchResult; // only defined when the book isn't in the library yet
}

export default function DetailContent({ book, searchResult }: Props) {
  const [aestheticImages, setAestheticImages] = useState(book.aestheticImages);

  function handleRemoveImage(url: string) {
    setAestheticImages((prev) => prev.filter((image) => image !== url));
  }

  return (
    <div className="min-w-0 pb-24 lg:pl-40">
      <HeroContent book={book} />
      <BookStats book={book} />
      <BookSummary book={book} />
      <QuoteSec book={book} />
      <Aesthetic images={aestheticImages} onRemoveImage={handleRemoveImage} />

      {searchResult && <AddToLibrary result={searchResult} />}
    </div>
  );
}
