import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Book } from "../../../types/book";
import QuoteCard from "./QuoteCard";
import AddQuoteCard from "./AddQuoteCard";
import type { Quote } from "../../../types/quote";
import AddQuoteModal from "../../../modals/AddQuoteModal";

interface Props {
  book: Book;
}

export default function QuoteEmbla({ book }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [localQuotes, setLocalQuotes] = useState<Quote[]>([]);

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

  const allQuotes = [...book.quotes, ...localQuotes];
  const totalSlides = allQuotes.length + 1;

  function handleAddQuote(newQuote: Quote) {
    const quote: Quote = {
      id: crypto.randomUUID(),
      text: newQuote.text,
      page: newQuote.page ?? 0,
      favorite: false,
      createdAt: new Date().toISOString(),
    };

    setLocalQuotes((prev) => [...prev, quote]);
    setOpenModal(false);

    requestAnimationFrame(() => {
      emblaApi?.scrollTo(allQuotes.length);
    });
  }

  return (
    <>
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {allQuotes.map((quote) => (
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
        <AddQuoteModal
          onClose={() => setOpenModal(false)}
          onSubmit={handleAddQuote}
        />
      )}
    </>
  );
}
