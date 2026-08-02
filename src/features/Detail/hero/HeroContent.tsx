import { useUpdateBook } from "../../../hooks/useUpdateBook";
import type { Book } from "../../../types/book";
import StatusBadge from "./StatusBadge";

interface Props {
  book: Book;
}

export default function HeroContent({ book }: Props) {
  const updateBook = useUpdateBook();

  return (
    <section
      className="
        px-6
        pt-27
        lg:px-10
        lg:pt-20
      "
    >
      <div className="max-w-3xl">
        <h1
          className="
            lg:mt-4
            font-serif
            text-4xl
            lg:text-7xl
            text-brown-900
          "
        >
          {book.title}
        </h1>

        <div
          className="
            lg:mt-5
            mt-3
            flex
            items-center
            justify-between
            gap-6
            flex-wrap
          "
        >
          <p
            className="
              lg:text-xl
              lg:text-2xl
              text-stone-600
            "
          >
            {book.author}
          </p>

          <StatusBadge
            value={book.status}
            onChange={(status) =>
              updateBook.mutate({
                id: book.id,
                changes: {
                  status,
                },
              })
            }
          />
        </div>

        <div
          className="
            mt-8
            border-t
            border-stone-200
          "
        />
      </div>
    </section>
  );
}
