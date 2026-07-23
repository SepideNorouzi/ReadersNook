import { Target } from "lucide-react";
import Card from "../../../components/ui/Card";
import ProgressBar from "../../../components/ui/Progressbar";
import { useReadingGoal } from "../../../hooks/useReadingGoal";

export default function ProgressCard() {
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
    <Card className="flex h-full flex-col justify-between p-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Target size={18} className="text-[#2C1810]" />
          <h2 className="text-base font-semibold text-[#2C1810]">
            Reading Goal
          </h2>
        </div>

        <p className="mt-1 text-sm text-[#8B7355]">Your progress this year</p>
      </div>

      {/* Percentage */}
      <div className="my-6 flex flex-col items-center">
        <span className="text-5xl font-bold text-[#2C1810]">
          {Math.round(progress)}%
        </span>

        <p className="mt-1 text-sm text-[#8B7355]">
          {booksRead} of {yearlyGoal} books
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={progress} />

      {/* Footer */}
      <div className="mt-4 text-center">
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
