import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
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
}: Props) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={onPrevious}
        className="
          flex h-7 w-7 items-center justify-center
          rounded-full
          bg-[#F5F0E8]
          transition
          hover:bg-[#E7DED0]
        "
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={`
              h-2 rounded-full transition-all duration-300

              ${
                currentIndex === index ? "w-5 bg-[#2C1810]" : "w-2 bg-[#D7CCBB]"
              }
            `}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="
          flex h-8 w-8 items-center justify-center
          rounded-full
          bg-[#F5F0E8]
          transition
          hover:bg-[#E7DED0]
        "
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
