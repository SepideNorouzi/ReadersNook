import type { Book } from "../../types/book";

interface HeroContentProps {
  book: Book;
}

export default function HeroContent({ book }: HeroContentProps) {
  return (
    <div
      className="
      pt-28
      px-6
      pb-10

      lg:pt-14
      lg:pl-40
      lg:pr-14

      relative
      z-10
      "
    >

      <h1 className="mt-4 text-4xl lg:text-6xl font-serif text-brown-900">
        {book.title}
      </h1>

      <p className="mt-2 text-lg text-stone-600">
        {book.author}
      </p>
    </div>
  );
}