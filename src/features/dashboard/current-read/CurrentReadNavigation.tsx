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

       <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={`
              rounded-full
              transition-all
              duration-300

              ${
                currentIndex === index
                  ? `
                    h-2
                    w-6

                    bg-gradient-to-r
                    from-[var(--brown-700)]
                    to-[var(--brown-500)]
                  `
                  : `
                    h-2
                    w-2

                    bg-[var(--stone-300)]
                  `
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
