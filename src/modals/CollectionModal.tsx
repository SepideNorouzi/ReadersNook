import { X, Library } from "lucide-react";
import type { CollectionWithBooks } from "../types/collection";
import Card from "../components/ui/Card";

interface Props {
  collection: CollectionWithBooks;
  onClose: () => void;
}

export default function CollectionModal({ collection, onClose }: Props) {
  return (
    /*
      Full-screen backdrop.
      Clicking outside the modal closes it.
    */
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        flex items-center justify-center

        bg-black/40
        backdrop-blur-sm

        p-4
      "
    >
      {/* Prevent clicks inside the modal from closing it */}
      <Card
        className="
          flex
          h-[80vh]
          w-full

          max-w-[380px]
          sm:max-w-[300px]
          lg:max-w-[500px]

          flex-col

          rounded-5xl

          border
          border-[var(--border)]

          bg-gradient-to-b
          from-white
          to-[var(--surface-hover)]

          p-6
        "
      >
        {/* ================= HEADER ================= */}

        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Library size={18} className="text-[var(--brown-700)]" />

              <h2 className="font-heading text-xl font-bold text-[var(--text)]">
                {collection.name}
              </h2>
            </div>

            {collection.description && (
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {collection.description}
              </p>
            )}

            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              {collection.books.length}{" "}
              {collection.books.length === 1 ? "Book" : "Books"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              transition
              hover:bg-[var(--stone-100)]
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}

        <div className="mb-5 border-b border-[var(--border)]" />

        {/* ================= BOOK GRID ================= */}

        {/*
          flex-1 makes this section fill the remaining height.

          overflow-y-auto means only THIS section scrolls,
          while the header always stays visible.
        */}

        <div
          className="
            flex-1
            overflow-y-auto

            pr-2
          pt-1
            scrollbar-hidden
          "
        >
          <div
            className="
              grid

              grid-cols-3

              gap-4

              sm:gap-5
            "
          >
            {collection.books.map((book) => (
              <button
                key={book.id}
                className="
                  group

                  flex
                  flex-col
                  items-center

                  text-center
                "
              >
                {/* Book cover */}

                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="
                    aspect-[2/3]
                    w-full

                    rounded-xl

                    object-cover

                    shadow-md

                    transition-all
                    duration-300

                    group-hover:-translate-y-1
                    group-hover:shadow-xl
                  "
                />

                {/* Title */}

                <p
                  className="
                    mt-2

                    line-clamp-2

                    text-xs
                    font-medium

                    text-[var(--text)]
                  "
                >
                  {book.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
