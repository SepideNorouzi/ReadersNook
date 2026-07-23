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

        grid-cols-3
        sm:grid-cols-4
        xl:grid-cols-3

        gap-4
      "
    >
      {books.map((book) => (
        <TBRBookItem key={book.id} book={book} />
      ))}
    </div>
  );
}
