import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Plus } from "lucide-react";

import type { Book } from "../../../types/book";

import QuoteCard from "./QuoteCard";

interface Props {
  book: Book;
}

export default function QuoteEmbla({ book }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    handleSelect();

    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  const totalSlides = book.quotes.length + 1;

  return (
    <>
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {book.quotes.map((quote) => (
            <div
              key={quote.id}
              className="
                min-w-0
                flex-[0_0_90%]
                pr-6
                md:flex-[0_0_50%]
                lg:flex-[0_0_38%]
                xl:flex-[0_0_33.333%]
              "
            >
              <QuoteCard quote={quote} />
            </div>
          ))}

          {/* Add Quote Card */}

          <div
            className="
              min-w-0
              flex-[0_0_90%]
              pr-6
              md:flex-[0_0_50%]
              lg:flex-[0_0_38%]
              xl:flex-[0_0_33.333%]
            "
          >
            <button
              className="
                flex
                min-h-[280px]
                w-full
                flex-col
                items-center
                justify-center
                gap-4
                rounded-[28px]
                border-2
                border-dashed
                border-[#D8C6AF]
                bg-[#FCFAF7]
                transition-all
                hover:border-[#C68B3C]
                hover:bg-[#FFFDFB]
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#EFE2D0]
                "
              >
                <Plus
                  className="
                    h-7
                    w-7
                    text-[#9C6A2B]
                  "
                />
              </div>

              <h3
                className="
                  text-lg
                  font-medium
                  text-brown-900
                "
              >
                Add Quote
              </h3>

              <p
                className="
                  max-w-[220px]
                  text-center
                  text-sm
                  leading-6
                  text-stone-500
                "
              >
                Save a passage from this book and revisit it whenever
                inspiration strikes.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
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
