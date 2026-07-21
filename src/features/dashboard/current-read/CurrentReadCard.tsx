import { useState } from "react";
import Card from "../../../components/ui/Card";
import { useCurrentRead } from "../../../hooks/useCurrentRead";
import CurrentReadCarousel from "./CurrentReadCarousel";
import CurrentReadNavigation from "./CurrentReadNavigation";
import CurrentReadProgress from "./CurrentReadProgress";
import CurrentReadDetails from "./CurrentReadDetail";

export default function CurrentReadingCard() {
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
    <Card className="space-y-5">
      <CurrentReadCarousel
        coverUrl={currentBook.coverUrl}
        title={currentBook.title}
      />

      <CurrentReadNavigation
        total={books.length}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <CurrentReadProgress
        currentPage={currentBook.currentPage}
        totalPages={currentBook.totalPages}
      />

      <CurrentReadDetails
        title={currentBook.title}
        author={currentBook.author}
        currentPage={currentBook.currentPage}
        totalPages={currentBook.totalPages}
      />
    </Card>
  );
}
