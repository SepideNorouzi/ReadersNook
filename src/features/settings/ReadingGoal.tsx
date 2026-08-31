import { useState } from "react";
import { BookOpen, Minus, Plus } from "lucide-react";

import Card from "../../components/ui/Card";
import { useReadingGoalStore } from "../../store/readingGoalStore";

export default function ReadingGoalSettings() {
  const readingGoal = useReadingGoalStore((state) => state.readingGoal);
  const setReadingGoal = useReadingGoalStore((state) => state.setReadingGoal);

  const [goal, setGoal] = useState(readingGoal);

  const updateGoal = (value: number) => {
    const nextGoal = Math.max(1, Math.min(365, value));

    setGoal(nextGoal);
    setReadingGoal(nextGoal);
  };

  return (
    <Card className="space-y-5">
      <div>
        <h2 className="mb-2 flex items-center gap-3 font-medium text-[var(--text)]">
          <BookOpen size={21} />
          <span>Yearly Reading Goal</span>
        </h2>

        <p className="text-sm text-[var(--text-secondary)]">
          Set the number of books you want to read this year.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-[var(--stone-100)] p-4">
        <button
          type="button"
          onClick={() => updateGoal(goal - 1)}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg
            text-[var(--brown-700)]
            transition
            hover:bg-[var(--surface)]
          "
        >
          <Minus size={18} />
        </button>

        <div className="text-center">
          <p className="text-3xl font-semibold text-[var(--text)]">{goal}</p>

          <p className="text-xs text-[var(--text-muted)]">books this year</p>
        </div>

        <button
          type="button"
          onClick={() => updateGoal(goal + 1)}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg
            text-[var(--brown-700)]
            transition
            hover:bg-[var(--surface)]
          "
        >
          <Plus size={18} />
        </button>
      </div>
    </Card>
  );
}
