import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import type { Book } from "../../../types/book";

interface Props {
  books: Book[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function CurrentReadEmbla({
  books,
  currentIndex,
  onSelect,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      onSelect(emblaApi.selectedScrollSnap());
    };

    handleSelect();

    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <>
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex min-w-0 flex-[0_0_100%] justify-center"
            >
              <div className="relative">
                {/* Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    scale-105
                    rounded-[28px]
                    bg-[radial-gradient(circle,var(--gold-light),transparent_70%)]
                    opacity-30
                    blur-xl
                  "
                />

                {/* Frame */}
                <div
                  className="
                    relative
                    rounded-[26px]
                    border
                    border-[var(--border)]
                    bg-gradient-to-b
                    from-white
                    to-[var(--stone-100)]
                    shadow-[0_12px_24px_rgba(54,35,27,.10)]
                  "
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="
                      aspect-[3/4]
                      w-32
                      rounded-[18px]
                      object-cover
                      shadow-[0_8px_18px_rgba(0,0,0,.18)]

                      sm:w-36
                      lg:w-32
                      xl:w-36
                    "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-2 lg:mt-6">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`
              rounded-full
              transition-all
              duration-300

              ${
                index === currentIndex
                  ? "h-2 w-5 bg-gradient-to-r from-[var(--brown-700)] to-[var(--brown-500)]"
                  : "h-2 w-2 bg-[var(--stone-300)] hover:bg-[var(--stone-400)]"
              }
            `}
          />
        ))}
      </div>
    </>
  );
}