import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import type { Book } from "../../../types/book";
import type { Quote, QuoteDraft } from "../../../types/quote";

import QuoteCard from "./QuoteCard";
import AddQuoteCard from "./AddQuoteCard";
import AddQuoteModal from "../../../modals/AddQuoteModal";

import { useBookQuotes, useCreateQuote } from "../../../hooks/useQuotes";

interface Props {
  book: Book;
}

export default function QuoteEmbla({ book }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const createQuote = useCreateQuote();

  /*
   * The book detail page now fetches the quotes for THIS
   * specific catalog book using:
   *
   * GET /books/{catalogId}/quotes/
   */
  const { data: fetchedQuotes, isLoading: quotesLoading } = useBookQuotes(
    book.catalogId,
  );

  /*
   * During the initial quote request, the book-detail response
   * may already contain nested quotes.
   *
   * We can use those temporarily while the dedicated quote
   * endpoint is loading.
   */
  const quotes: Quote[] =
    quotesLoading && book.quotes.length > 0 ? book.quotes : fetchedQuotes;

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

  /*
   * Every quote occupies one slide and the final slide is
   * the Add Quote card.
   */
  const totalSlides = quotes.length + 1;

  function handleAddQuote(quote: QuoteDraft) {
    if (!book.catalogId) {
      return;
    }

    createQuote.mutate(
      {
        bookId: book.catalogId,
        quote,
      },
      {
        /*
         * The mutation cache is updated BEFORE this success
         * callback is finished.
         *
         * useBookQuotes() is subscribed to that same exact
         * query key, so the carousel receives the newly-created
         * quote from React Query immediately.
         */
        onSuccess: () => {
          setOpenModal(false);

          /*
           * `quotes.length` is the number of quotes that existed
           * BEFORE this new quote was added.
           *
           * Therefore that number is exactly the new quote's
           * slide index.
           */
          requestAnimationFrame(() => {
            emblaApi?.scrollTo(quotes.length);
          });
        },
      },
    );
  }

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="
                min-w-0
                flex-[0_0_90%]
                pr-6
                pt-1
                h-[200px]
                md:flex-[0_0_50%]
                lg:flex-[0_0_38%]
                xl:flex-[0_0_33.333%]
              "
            >
              <QuoteCard quote={quote} />
            </div>
          ))}

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

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({
          length: totalSlides,
        }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to quote slide ${index + 1}`}
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
          onClose={() => {
            if (!createQuote.isPending) {
              setOpenModal(false);
            }
          }}
          onSubmit={handleAddQuote}
          isSubmitting={createQuote.isPending}
        />
      )}
    </>
  );
}
