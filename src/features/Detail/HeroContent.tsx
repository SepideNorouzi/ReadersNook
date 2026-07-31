import type { ReactNode } from "react";
import type { Book } from "../../types/book";

interface Props {
  book: Book;
  children: ReactNode;
}

export default function HeroContent({ book, children }: Props) {
  return (
    <div
      className="
      relative
      z-20

      flex

      flex-col

      lg:flex-row

      gap-10

      px-6

      lg:px-12

      py-8

      lg:items-center

      bg-transparent
      "
    >
      {children}

      <div
        className="
        text-white

        lg:text-brown-900

        space-y-4
        "
      >
        <h1 className="text-5xl font-serif">{book.title}</h1>

        <h2 className="text-xl opacity-70">{book.author}</h2>

        {/* progress */}

        {/* actions */}
      </div>
    </div>
  );
}
