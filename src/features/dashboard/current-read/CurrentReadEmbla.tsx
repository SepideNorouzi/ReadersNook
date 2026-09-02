import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import type { Book } from "../../../types/book";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

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
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {books.map((book) => (
            <div
              key={book.id}
              className="
                flex
                min-w-0
                flex-[0_0_100%]
                justify-center
              "
            >
              <div className="relative">
                {/* Soft warm glow behind the cover */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-[-10px]

                    rounded-[26px]

                    bg-[radial-gradient(circle,var(--gold-light),transparent_68%)]

                    opacity-20
                    blur-2xl
                  "
                />

                {/* Cover frame */}
                <div
                  className="
                    relative
                    overflow-hidden

                    rounded-[20px]

                    border
                    border-[var(--brown-300)]/35

                    bg-[var(--brown-800)]

                    shadow-[0_14px_30px_rgba(35,23,17,0.32)]

                    transition-all
                    duration-300
                  "
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    onClick={() => navigate(`/book/${book.id}`)}
                    className="
                      block
                      aspect-[3/4]
                      w-[88px]

                      cursor-pointer

                      rounded-[18px]

                      object-cover

                      shadow-[0_8px_18px_rgba(35,23,17,0.28)]

                      transition-transform
                      duration-300

                      hover:scale-[1.02]

                      sm:w-32

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

      {/* Carousel indicators */}
      <div
        className="
          mt-3
          flex
          justify-center
          gap-2

          lg:mt-6
        "
      >
        {books.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to book ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`
              rounded-full
              transition-all
              duration-300

              ${
                index === currentIndex
                  ? `
                    h-1.5
                    w-5

                    bg-gradient-to-r
                    from-[var(--gold)]
                    to-[var(--orange)]

                    shadow-[0_0_8px_rgba(207,162,71,0.35)]
                  `
                  : `
                    h-1.5
                    w-1.5

                    bg-[var(--brown-300)]/45

                    hover:bg-[var(--brown-200)]/70
                  `
              }
            `}
          />
        ))}
      </div>
    </>
  );
}
