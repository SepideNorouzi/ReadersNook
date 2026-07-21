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
      <button
        onClick={onPrevious}
        className="text-xl text-[#8B7355] hover:text-[#2C1810]"
      >
        ‹
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

      <button
        onClick={onNext}
        className="text-xl text-[#8B7355] hover:text-[#2C1810]"
      >
        ›
      </button>
    </div>
  );
}
