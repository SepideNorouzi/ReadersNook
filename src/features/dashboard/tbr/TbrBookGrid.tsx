import type { Book } from "../../../types/book";
import TBRBookItem from "./TbrBookItem";

interface Props {
  books: Book[];
}

export default function TBRBookGrid({ books }: Props) {
  return (
    <div
      className="
        grid
        grid-cols-4
        gap-2

        sm:gap-3

        lg:grid-cols-3
        lg:gap-4
      "
    >
      {books.map((book, index) => (
        <TBRBookItem key={book.id} book={book} isNext={index === 0} />
      ))}
    </div>
  );
}