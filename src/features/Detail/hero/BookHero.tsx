import { useEffect, useState } from "react";
import type { Book } from "../../../types/book";
import { useBookPalette } from "../../../hooks/useBookPalette";

import HeroBackground from "./HeroBackground";
import HeroCover from "./HeroCover";

interface Props {
  book: Book;
}

export default function BookHero({ book }: Props) {
  const palette = useBookPalette(book.coverUrl);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mobile scroll animation
  const progress = Math.min(scrollY / 180, 1);

  // 240px -> 170px
  const heroHeight = 240 - progress * 70;

  // 180px -> 140px
  const coverWidth = 180 - progress * 40;

  return (
    <div
      className="
        sticky
        top-0
        z-40
        h-[240px]
        lg:h-screen
      "
    >
      {/* MOBILE */}
      <div
        className="relative lg:hidden"
        style={{
          height: `${heroHeight}px`,
        }}
      >
        <HeroBackground
          image={book.coverUrl}
          gradient={palette.gradient}
          progress={progress}
        />

        <HeroCover
          cover={book.coverUrl}
          title={book.title}
          shadow={palette.shadow}
          width={coverWidth}
          progress={progress}
        />
      </div>

      {/* DESKTOP */}
      <div className="relative hidden h-screen lg:block">
        <HeroBackground
          image={book.coverUrl}
          gradient={palette.gradient}
          progress={0}
        />

        <HeroCover
          cover={book.coverUrl}
          title={book.title}
          shadow={palette.shadow}
          width={260}
          progress={0}
        />
      </div>
    </div>
  );
}
