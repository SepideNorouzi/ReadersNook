import { useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark, BookMarked } from "lucide-react";

import { useCurrentRead } from "../../../hooks/useCurrentRead";
import Card from "../../../components/ui/Card";
import CurrentReadProgress from "./CurrentReadProgress";
import CurrentReadDetails from "./CurrentReadDetail";
import CurrentReadEmbla from "./CurrentReadEmbla";

interface CurrentReadProps {
  className?: string;
}

export default function CurrentReadingCard({ className }: CurrentReadProps) {
  const { books, isLoading } = useCurrentRead();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    <Card
  className={`
    flex
    items-center
    justify-center
    self-start

    rounded-[22px]
    sm:rounded-[28px]

    bg-gradient-to-br
    from-[var(--brown-700)]
    to-[var(--brown-900)]

    lg:self-auto

    ${className ?? ""}
  `}
>
  <p className="text-sm text-white/60">Loading...</p>
</Card>
  }

  const hasBooks = books.length > 0;
  const currentBook = books[currentIndex];

  return (
    <Card
      className={`
  flex
  min-h-0
  flex-col
  self-start
  overflow-hidden

  rounded-[22px]
  sm:rounded-[28px]

  bg-gradient-to-br
  from-[var(--brown-700)]
  to-[var(--brown-900)]

  p-3.5
  sm:p-4
  lg:p-6

  transition-all
  duration-300

  lg:self-auto

  hover:-translate-y-1
  hover:shadow-[var(--shadow-lg)]

  ${className ?? ""}
`}
    >
      {/* Header */}
<header className="mb-4 flex shrink-0 items-center justify-between lg:mb-5">
  <div className="flex items-center gap-2">
    <Bookmark
      size={14}
      className="hidden shrink-0 text-[var(--gold-light)] lg:block"
    />

    <h3 className="font-heading text-sm font-semibold text-white lg:text-lg">
      Currently Reading
    </h3>
  </div>

  {hasBooks && (
    <span
      className="
        hidden
        shrink-0
        rounded-full
        bg-white/10

        px-2.5
        py-1

        text-[11px]
        font-medium
        uppercase
        tracking-[0.18em]

        text-white/70

        lg:inline-flex
      "
    >
      {books.length}
    </span>
  )}
</header>

      {hasBooks ? (
        <>
{/* ================= MOBILE ================= */}
<div className="flex w-full flex-col gap-3.5 lg:hidden">
  <div className="flex items-center gap-3.5 sm:gap-4">
    {/* Cover */}
    <div className="w-[92px] shrink-0 sm:w-[104px]">
      <CurrentReadEmbla
        books={books}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
      />
    </div>

    {/* Details */}
    <div className="min-w-0 flex-1">
      <CurrentReadDetails book={currentBook} />
    </div>
  </div>

  {/* Continue Reading */}
  <button
    type="button"
    onClick={() => navigate(`/book/${currentBook.id}`)}
    className="
      w-full
      rounded-full
      bg-white/10

      py-2.5

      text-center
      text-sm
      font-medium
      text-white

      transition-colors
      active:bg-white/15
    "
  >
    Continue Reading
  </button>
</div>



{/* DESKTOP */}
<div className="hidden lg:block">

  <CurrentReadEmbla
    books={books}
    currentIndex={currentIndex}
    onSelect={setCurrentIndex}
  />

  <div className="mt-auto space-y-2 pt-2">

    <CurrentReadProgress book={currentBook} />

    <CurrentReadDetails book={currentBook} />

  </div>

</div>
        </>
      ) : (
        /* Empty state */
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4 text-center">
  <div
    className="
      flex
      h-11
      w-11
      items-center
      justify-center

      rounded-full
      bg-white/10
      text-white

      lg:h-14
      lg:w-14
    "
  >
    <BookMarked size={18} className="lg:hidden" />
    <BookMarked size={22} className="hidden lg:block" />
  </div>

  <div className="space-y-1">
    <p className="font-heading text-sm font-semibold text-white lg:text-base">
      Nothing in progress
    </p>
    <p className="mx-auto max-w-[200px] text-xs text-white/60 lg:text-sm">
      Add a book and mark it as current to see it here.
    </p>
  </div>

  <button
    onClick={() => navigate("/search")}
    className="
      mt-1
      rounded-full
      bg-white/10

      px-4
      py-1.5

      text-xs
      font-medium
      text-white

      transition-all
      hover:bg-white/15

      lg:text-sm
    "
  >
    Find a book
  </button>
</div>
      )}
    </Card>
  );
}
