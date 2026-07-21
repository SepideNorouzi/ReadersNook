interface CurrentReadingProgressProps {
  currentPage: number;
  totalPages: number;
}

export default function CurrentReadProgress({
  currentPage,
  totalPages,
}: CurrentReadingProgressProps) {
  const percentage = Math.round((currentPage / totalPages) * 100);

  return (
    <div className="space-y-2">
      <p className="text-sm text-[#8B7355]">Progress {percentage}%</p>

      <div className="h-2 overflow-hidden rounded-full bg-[#EDE8DC]">
        <div
          className="h-full rounded-full bg-[#2C1810]"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
