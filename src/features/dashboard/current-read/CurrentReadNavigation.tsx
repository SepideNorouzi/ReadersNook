import { ChevronLeft, ChevronRight } from "lucide-react";

interface CurrentReadingNavigationProps {
  total: number;
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function CurrentReadNavigation({
  total,
  currentIndex,
  onNext,
  onPrevious,
}: CurrentReadingNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button onClick={onPrevious}>
        <ChevronLeft size={18} />
      </button>

      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-[#2C1810]" : "bg-[#D7CCBB]"
            }`}
          />
        ))}
      </div>

      <button onClick={onNext}>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
