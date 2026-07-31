import type { Book } from "../../types/book";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroCover from "./HeroCover";


interface Props {
  book: Book;
}

export default function BookHero({ book }: Props) {
  return (
    <section
      className="
      sticky
      top-0
      z-30

      lg:h-screen

      flex
      flex-col

      lg:grid
      lg:grid-cols-[360px_1fr]
      "
    >
      <HeroBackground image={book.coverUrl} />

      <HeroContent book={book}>
        <HeroCover cover={book.coverUrl} title={book.title} />
      </HeroContent>
    </section>
  );
}
