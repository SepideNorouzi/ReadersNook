import { useUpdateBook } from "../../../hooks/useBooks";
import type { Book, BookStatus } from "../../../types/book";
import CollectionPicker from "../collection/CollectionPicker";
import HeroActionsMenu from "./HeroActionsMenu";
import StatusBadge from "./StatusBadge";

interface Props {
  book: Book;
}

export default function HeroContent({ book }: Props) {
  const updateBook = useUpdateBook();

  const handleStatusChange = (status: BookStatus) => {
    updateBook.mutate({ id: book.id, changes: { status } });
  };

  return (
    <section
      className="
        px-6
        pt-[108px]
        sm:px-8
        lg:px-10
        lg:pt-20
      "
    >
      <div className="max-w-3xl">
        <h1
          className="
            lg:mt-4
            lg:pt-4
            lg:pb-4
            font-serif
            text-4xl
            lg:text-6xl
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
          {/* Desktop: both pickers inline, unchanged */}
          <div className="hidden lg:flex flex-wrap items-center gap-2">
            <StatusBadge value={book.status} onChange={handleStatusChange} />
            <CollectionPicker book={book} />
          </div>

          {/* Mobile: collapsed into the "..." sheet */}
          <div className="lg:hidden">
            <HeroActionsMenu
              book={book}
              status={book.status}
              onStatusChange={handleStatusChange}
            />
          </div>
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
