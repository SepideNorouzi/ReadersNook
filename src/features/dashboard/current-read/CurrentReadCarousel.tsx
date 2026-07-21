import type { Book } from "../../../types/book";

interface CurrentReadCarouselProps {
  book: Book;
}

export default function CurrentReadCarousel({
  book,
}: CurrentReadCarouselProps) {
  return (
    <div className="flex justify-center py-2">
      <img
        src={book.coverUrl}
        alt={book.title}
        className="
w-36
sm:w-40
lg:w-44
xl:w-48

aspect-[3/4]

rounded-2xl
object-cover

border
border-[#E6DDD0]

shadow-lg
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"
      />
    </div>
  );
}
