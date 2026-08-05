import { Link } from "react-router";
import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function TBRBookItem({ book }: Props) {
  return (
    <Link
      to={`/book/${book.id}`}
      className="
        group
        flex
        h-full
        min-w-0
        flex-col
        text-left
      "
    >
      {/* Cover */}
      <div
        className="
          overflow-hidden
          rounded-lg
          sm:rounded-xl
          lg:rounded-2xl

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
            aspect-[3/4]
            w-full
            object-cover
          "
        />
      </div>

      {/* Title */}
      <p
        className="
          mt-1.5
          sm:mt-2

          line-clamp-2

          text-center
          text-[9px]
          sm:text-[10px]
          lg:text-xs

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
