import type { Book } from "../../types/book";
import { useBookPalette } from "../../hooks/useBookPalette";

import HeroBackground from "./HeroBackground";
import HeroCover from "./HeroCover";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  book: Book;
}

export default function BookHero({ book }: Props) {
  const palette = useBookPalette(book.coverUrl);
  const navigate = useNavigate();

  return (
    <div
      className="
      sticky
      top-0

      h-[240px]
      lg:h-screen

      relative
      "
    >
      <HeroBackground image={book.coverUrl} gradient={palette.gradient} />

      <HeroCover
        cover={book.coverUrl}
        title={book.title}
        shadow={palette.shadow}
      />
      <button
        onClick={() => navigate(-1)}
        className="
    pointer-events-auto

    ml-6
    lg:ml-10

    flex
    items-center
    justify-center

    h-11
    w-11

    rounded-full

    border
    border-white/40

    bg-red/80

    backdrop-blur-xl

    shadow-lg

    transition-all

    hover:scale-105
    hover:bg-white
    "
      >
        <ChevronLeft className="h-5 w-5 text-stone-700" />
      </button>
    </div>
  );
}
