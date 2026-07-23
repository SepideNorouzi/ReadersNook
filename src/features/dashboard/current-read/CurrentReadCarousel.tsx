import type { Book } from "../../../types/book";

interface CurrentReadCarouselProps {
  book: Book;
}

export default function CurrentReadCarousel({
  book,
}: CurrentReadCarouselProps) {
  return (
<div className="flex justify-center py-1">
  <img
    src={book.coverUrl}
    alt={book.title}
    className="
      w-28
      sm:w-32
      lg:w-36
      xl:w-36
      aspect-[3/4]
      rounded-2xl
      object-cover
      border
      border-[#E6DDD0]
      shadow-md
    "
  />
</div>
  );
}
