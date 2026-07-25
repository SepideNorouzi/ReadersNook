import type { Book } from "../../../types/book";
import TBRBookItem from "./TbrBookItem";

interface Props {
  books: Book[];
}

export default function TBRBookGrid({ books }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      {books.map((book) => (
        <TBRBookItem key={book.id} book={book} />
      ))}
    </div>
  );
}
