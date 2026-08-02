import { useState } from "react";
import { BookOpen, Pencil, Star } from "lucide-react";
import type { Book } from "../../../types/book";
import BookPagesModal from "../../../modals/BookPagesModal";

interface Props {
  book: Book;
}

export default function BookStats({ book }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section
        className="
          px-6
          lg:mb-0
          mb-4
        "
      >
        <div
          className="
            max-w-3xl
            pr-8
            pl-8
          "
        >
          <div
            className="
    mt-6

    flex
    items-start
    justify-between

    gap-4
  "
          >
            {/* Rating */}

            <div>
              <p
                className="
                  lg:text-sm
                  text-[12px]
                  font-medium
                  text-[var(--gold)]
                "
              >
                Rating
              </p>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-1
                "
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`
                      lg:h-5
                      lg:w-5
                      h-3
                      w-3
                      ${
                        index < book.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-300"
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* Pages */}

            <div>
              <p
                className="
                  lg:text-sm
                  text-[12px]
                  font-medium
                  text-[var(--gold)]
                "
              >
                Pages
              </p>

              <div
                className="
                  mt-2

                  flex
                  items-center
                  gap-2
                "
              >
                <BookOpen
                  className="
                    lg:h-5
                      lg:w-5
                      h-3
                      w-3
                    text-stone-500
                  "
                />

                <span
                  className="
                    lg:text-lg
                    text-[15px]
                    font-semibold
                    text-brown-900
                  "
                >
                  {book.totalPages}
                </span>
              </div>
            </div>

            {/* Current Reading */}

            {book.status === "current" && (
              <div>
                <p
                  className="
                    lg:text-sm
                  text-[12px]
                    font-medium
                    text-[var(--gold)]
                  "
                >
                  Current Page
                </p>

                <div
                  className="
                    mt-2

                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      lg:text-lg
                    text-[15px]
                      font-semibold
                      text-brown-900
                    "
                  >
                    {book.currentPage} / {book.totalPages}
                  </span>

                  <button
                    onClick={() => setOpenModal(true)}
                    className="
                      rounded-full

                      p-2

                      transition

                      hover:bg-stone-200
                    "
                  >
                    <Pencil
                      className="
                        lg:h-4
                      lg:w-4
                      h-3
                      w-3
                        text-stone-500
                      "
                    />
                  </button>
                </div>
              </div>
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
