import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Book } from "../../../types/book";
import QuoteCard from "./QuoteCard";
import AddQuoteCard from "./AddQuoteCard";

interface Props {
  book: Book;
}

export default function QuoteEmbla({ book }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

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
                pt-1
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
    pt-1
    md:flex-[0_0_50%]
    lg:flex-[0_0_38%]
    xl:flex-[0_0_33.333%]
  "
          >
            <AddQuoteCard onClick={() => setOpenModal(true)} />
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
      {openModal && (
        <div
          className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
    "
        >
          <div
            className="
        rounded-3xl
        bg-white
        p-8
        shadow-2xl
      "
          >
            <p className="text-lg font-semibold text-[var(--brown-900)]">
              Add Quote Modal
            </p>

            <button
              onClick={() => setOpenModal(false)}
              className="
          mt-4
          rounded-full
          bg-[var(--brown-100)]
          px-4
          py-2
          text-sm
          text-[var(--brown-700)]
          hover:bg-[var(--brown-200)]
        "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
