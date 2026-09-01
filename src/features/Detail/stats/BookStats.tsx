import { useState } from "react";
import { BookOpen, Pencil, Star } from "lucide-react";
import type { Book } from "../../../types/book";
import BookPagesModal from "../../../modals/BookPagesModal";

interface Props {
  book: Book;
}

export default function BookStats({ book }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const progress =
    book.totalPages > 0
      ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100))
      : 0;

  return (
    <>
      <section
        className="
          px-5
          pt-4
          sm:px-6

          lg:pt-6
        "
      >
        <div
          className="
            w-full
            max-w-3xl

            overflow-hidden

            rounded-[24px]
            sm:rounded-[30px]

            border
            border-[var(--brown-300)]/40

            bg-gradient-to-br
            from-[var(--brown-50)]
            via-[var(--gold-light)]/70
            to-white

            px-4
            py-3.5

            shadow-[0_8px_28px_rgba(35,23,17,0.07)]

            sm:px-6
            sm:py-4

            lg:px-8
          "
        >
          <div
            className="
              flex
              w-full
              items-center

              overflow-x-auto

              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {/* Rating */}
            <div
              className="
                flex
                min-w-0
                flex-1
                flex-col
                items-center
                gap-1
                text-center
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--gold)]

                  sm:text-[10px]
                  sm:tracking-[0.18em]
                "
              >
                Rating
              </p>

              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`
                      h-3
                      w-3

                      sm:h-3.5
                      sm:w-3.5

                      ${
                        index < book.rating
                          ? "fill-[var(--gold)] text-[var(--gold)]"
                          : "text-[var(--brown-300)]"
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              className="
                mx-2
                h-8
                w-px
                shrink-0
                bg-[var(--brown-300)]/50

                sm:mx-4
                sm:h-10
              "
            />

            {/* Pages */}
            <div
              className="
                flex
                min-w-0
                flex-1
                flex-col
                items-center
                gap-1
                text-center
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--gold)]

                  sm:text-[10px]
                  sm:tracking-[0.18em]
                "
              >
                Pages
              </p>

              <div className="flex items-center gap-1.5">
                <BookOpen
                  className="
                    h-3.5
                    w-3.5
                    text-[var(--brown-700)]

                    sm:h-4
                    sm:w-4
                  "
                />

                <span
                  className="
                    text-sm
                    font-bold
                    text-brown-900

                    sm:text-base
                  "
                >
                  {book.totalPages}
                </span>
              </div>
            </div>

            {/* Current Reading */}
            {book.status === "current" && (
              <>
                {/* Divider */}
                <div
                  className="
                    mx-2
                    h-8
                    w-px
                    shrink-0
                    bg-[var(--brown-300)]/50

                    sm:mx-4
                    sm:h-10
                  "
                />

                <div
                  className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    items-center
                    gap-1
                    text-center
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[var(--gold)]

                      sm:text-[10px]
                      sm:tracking-[0.18em]
                    "
                  >
                    Reading
                  </p>

                  <div className="flex items-center gap-1.5">
                    <span
                      className="
                        text-sm
                        font-bold
                        text-brown-900

                        sm:text-base
                      "
                    >
                      {book.currentPage}

                      <span
                        className="
                          text-[10px]
                          font-medium
                          text-[var(--text-muted)]

                          sm:text-xs
                        "
                      >
                        {" "}
                        / {book.totalPages}
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setOpenModal(true)}
                      aria-label="Edit current page"
                      className="
                        shrink-0
                        rounded-full
                        p-1
                        text-[var(--brown-700)]
                        transition

                        hover:bg-white/60
                        hover:text-[var(--brown-900)]
                      "
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                  </div>

                  <div
                    className="
                      h-1
                      w-10
                      overflow-hidden
                      rounded-full
                      bg-white/70

                      sm:w-14
                    "
                  >
                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-[var(--gold)]
                        to-[var(--brown-500)]
                        transition-all
                        duration-500
                      "
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <BookPagesModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        book={book}
      />
    </>
  );
}