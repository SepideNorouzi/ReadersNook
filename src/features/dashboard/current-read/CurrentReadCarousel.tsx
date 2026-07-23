import type { Book } from "../../../types/book";

interface CurrentReadCarouselProps {
  book: Book;
}

export default function CurrentReadCarousel({
  book,
}: CurrentReadCarouselProps) {
  return (
    <div className="flex justify-center">
      <div className="relative">
        {/* Soft glow behind the cover */}
        <div
          className="
            absolute
            inset-0
            scale-110

            rounded-[28px]

            bg-[radial-gradient(circle,var(--gold-light),transparent_70%)]

            opacity-40
            blur-2xl
          "
        />

        {/* Book frame */}
        <div
          className="
            relative

            rounded-[26px]

            bg-gradient-to-b
            from-white
            to-[var(--stone-100)]

            border
            border-[var(--border)]

            shadow-[0_12px_24px_rgba(54,35,27,.10)]

            transition-all
            duration-300

            group-hover:-translate-y-1
            group-hover:shadow-[0_18px_34px_rgba(54,35,27,.16)]
          "
        >
          <img
            src={book.coverUrl}
            alt={book.title}
            className="
              aspect-[3/4]

              w-28
              sm:w-32
              lg:w-32
              xl:w-36

              rounded-[18px]

              object-cover

              shadow-[0_8px_18px_rgba(0,0,0,.18)]

              transition-transform
              duration-300

              group-hover:scale-[1.02]
            "
          />
        </div>
      </div>
    </div>
  );
}