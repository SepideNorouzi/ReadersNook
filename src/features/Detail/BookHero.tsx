import type { Book } from "../../types/book";
import { useBookPalette } from "../../hooks/useBookPalette";

import HeroBackground from "./HeroBackground";
import HeroCover from "./HeroCover";
import HeroContent from "./HeroContent";

interface Props {
  book: Book;
}

export default function BookHero({ book }: Props) {
  const palette = useBookPalette(book.coverUrl);

  return (
    <section
      className="
      w-full

      lg:grid
      lg:grid-cols-[340px_minmax(0,1fr)]
      "
    >
      {/* Sticky hero */}
      <div
        className="
        sticky
        top-0
        z-30

        relative

        h-[240px]

        lg:h-screen
        "
      >
        <HeroBackground image={book.coverUrl} gradient={palette.gradient} />

        <HeroCover
          cover={book.coverUrl}
          title={book.title}
          shadow={palette.shadow}
        />
      </div>

      <HeroContent book={book} />
    </section>
  );
}
