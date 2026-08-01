import type { Book } from "../../../types/book";
import { useBookPalette } from "../../../hooks/useBookPalette";

import HeroBackground from "./HeroBackground";
import HeroCover from "./HeroCover";

interface Props {
  book: Book;
}

export default function BookHero({ book }: Props) {
  const palette = useBookPalette(book.coverUrl);

  return (
    <div
  className="
    sticky
    top-0

    relative
    z-40

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
  );
}
