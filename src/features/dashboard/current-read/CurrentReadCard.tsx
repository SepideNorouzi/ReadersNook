import { useState } from "react";
import Card from "../../../components/ui/Card";
import { useCurrentRead } from "../../../hooks/useCurrentRead";
import CurrentReadCarousel from "./CurrentReadCarousel";
import CurrentReadNavigation from "./CurrentReadNavigation";
import CurrentReadProgress from "./CurrentReadProgress";
import CurrentReadDetails from "./CurrentReadDetail";

interface CurrentReadProps {
  className?: string;
}

export default function CurrentReadingCard({ className }: CurrentReadProps) {
  const { books, isLoading } = useCurrentRead();

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  }

  function handlePrevious() {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  }

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (books.length === 0) {
    return <Card>No current book.</Card>;
  }

  const currentBook = books[currentIndex];

  return (
    <Card className={`
    flex
    h-full
    flex-col
    gap-4
    overflow-hidden
    p-6
    ${className ?? ""}
  `}>
      <h3 className="text-lg font-semibold text-[#2C1810]">
        📖 Currently Reading
      </h3>
      <CurrentReadCarousel book={currentBook} />

      <CurrentReadNavigation
        total={books.length}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <CurrentReadProgress book={currentBook} />

      <CurrentReadDetails book={currentBook} />
    </Card>
  );
}
