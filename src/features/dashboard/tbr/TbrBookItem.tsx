import { Link } from "react-router";
import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function TBRBookItem({ book }: Props) {
  return (
    <Link
      to={`/books/${book.id}`}
      className="
        group

        flex
        flex-col

        text-left
      "
    >
      {/* Cover */}
      <div
        className="
          overflow-hidden

          rounded-2xl

          border
          border-[var(--border)]

          bg-[var(--stone-100)]

          shadow-sm

          transition-all
          duration-300

          group-hover:-translate-y-1
          group-hover:shadow-lg
        "
      >
        <img
          src={book.coverUrl}
          alt={book.title}
          className="
            aspect-[2/3]
            w-full

            object-cover

            transition-transform
            duration-300

            group-hover:scale-105
          "
        />
      </div>

      {/* Title */}
      <p
        className="
          mt-2

          line-clamp-2

          text-center

          text-xs
          font-medium
          font-heading

          leading-snug

          text-[var(--text)]
        "
      >
        {book.title}
      </p>
    </Link>
  );
}
