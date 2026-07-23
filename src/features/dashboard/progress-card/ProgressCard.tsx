import { Target } from "lucide-react";
import Card from "../../../components/ui/Card";
import { useReadingGoal } from "../../../hooks/useReadingGoal";
import CircularProgress from "../../../components/ui/CircularProgress";

interface ProgressCardProps {
  className?: string;
}

export default function ProgressCard({ className }: ProgressCardProps) {
  const { booksRead, yearlyGoal, progress, isLoading } = useReadingGoal();

  if (isLoading) {
    return (
      <Card className="flex h-full items-center justify-center">
        <p className="text-sm text-[#8B7355]">Loading...</p>
      </Card>
    );
  }

  const remaining = Math.max(yearlyGoal - booksRead, 0);

  return (
    <Card className={className}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-8">
          <Target size={18} className="text-[#2C1810]" />
          <h2 className="text-base font-semibold text-[#2C1810]">
            Yearly Reading Goal
          </h2>
        </div>
      </div>

      {/* Percentage */}
      <div className="my-6 flex justify-center">
        <CircularProgress value={progress} />
      </div>

      <p className="text-center text-sm text-[#8B7355]">
        {booksRead} of {yearlyGoal} books
      </p>

      {/* Footer */}
      <div className="mt-10 text-center">
        {remaining > 0 ? (
          <p className="text-sm text-[#8B7355]">
            <span className="font-semibold text-[#2C1810]">{remaining}</span>{" "}
            books left to reach your goal 📚
          </p>
        ) : (
          <p className="text-sm font-medium text-[#2C1810]">
            🎉 Goal achieved! Time to set a new one.
          </p>
        )}
      </div>
    </Card>
  );
}
