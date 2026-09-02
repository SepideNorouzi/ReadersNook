import { Link } from "react-router";
import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function TBRBookItem({ book }: Props) {
  return (
    <Link
      to={`/book/${book.id}`}
      className="
        group
        flex
        h-full
        min-w-0
        flex-col
        text-left
      "
    >
      {/* Cover */}

      <div
        className="
          relative
          overflow-visible
        "
      >
        {/* Ambient glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[-6px]
            z-0

            rounded-[18px]

            bg-[radial-gradient(
              circle,
              rgba(207,162,71,0.20),
              transparent_68%
            )]

            opacity-0
            blur-xl

            transition-all
            duration-500

            group-hover:opacity-100
          "
        />

        {/* Book frame */}

        <div
          className="
            relative
            z-10

            overflow-hidden

            rounded-lg
            sm:rounded-xl
            lg:rounded-2xl

            border
            border-[rgba(207,162,71,0.16)]

            bg-[var(--stone-100)]

            shadow-[
              0_8px_18px_rgba(35,23,17,0.10),
              0_2px_5px_rgba(35,23,17,0.06)
            ]

            transition-all
            duration-400
            ease-out

            group-hover:-translate-y-1
            group-hover:border-[rgba(207,162,71,0.32)]
            group-hover:shadow-[
              0_16px_28px_rgba(35,23,17,0.15),
              0_6px_12px_rgba(35,23,17,0.07),
              0_0_18px_rgba(207,162,71,0.10)
            ]
          "
        >
          <img
            src={book.coverUrl}
            alt={book.title}
            className="
              block
              aspect-[3/4]
              w-full
              object-cover

              transition-transform
              duration-500
              ease-out

              group-hover:scale-[1.025]
            "
          />

          {/* Fine glass highlight */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0

              bg-gradient-to-br
              from-white/[0.10]
              via-transparent
              to-black/[0.07]

              opacity-70
            "
          />

          {/* Bottom warm reflection */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0

              h-1/4

              bg-gradient-to-t
              from-[rgba(185,109,69,0.10)]
              to-transparent

              opacity-70
            "
          />
        </div>
      </div>

      {/* Title */}

      <p
        className="
          mt-1.5

          line-clamp-2

          text-center

          text-[9px]
          font-medium
          font-heading
          leading-snug

          text-[var(--text)]

          transition-colors
          duration-300

          group-hover:text-[var(--brown-700)]

          sm:mt-2
          sm:text-[10px]

          lg:text-xs
        "
      >
        {book.title}
      </p>
    </Link>
  );
}