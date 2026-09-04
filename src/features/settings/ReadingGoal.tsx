import { BookOpen, Minus, Plus } from "lucide-react";

import Card from "../../ui/Card";
import { useReadingGoalStore } from "../../store/readingGoalStore";

export default function ReadingGoalSettings() {
  const readingGoal = useReadingGoalStore((state) => state.readingGoal);
  const setReadingGoal = useReadingGoalStore((state) => state.setReadingGoal);

  const updateGoal = (value: number) => {
    const nextGoal = Math.max(1, Math.min(365, value));
    setReadingGoal(nextGoal);
  };

  return (
    <Card
      className="
        relative overflow-hidden
        rounded-[20px]
        border border-[var(--gold)]/20
        bg-gradient-to-br
        from-[var(--gold-light)]/45
        via-[var(--surface)]
        to-[var(--orange-light)]/25
        p-4
        shadow-[0_6px_20px_rgba(207,162,71,0.08)]
        sm:p-5
      "
    >
      <div
        className="
          pointer-events-none absolute
          -right-10 -top-10
          h-28 w-28
          rounded-full
          bg-[var(--gold)]/10
          blur-2xl
        "
      />

      <div className="relative flex items-center gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-[var(--gold-light)]
            text-[var(--gold)]
          "
        >
          <BookOpen size={19} />
        </div>

        <div>
          <h3 className="font-medium text-[var(--text)]">
            Yearly Reading Goal
          </h3>

          <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
            How many books do you want to read this year?
          </p>
        </div>
      </div>

      <div
        className="
          relative mt-4
          flex items-center justify-between
          rounded-[16px]
          border border-[var(--gold)]/15
          bg-[var(--surface)]/75
          px-3 py-3
          shadow-inner
        "
      >
        <button
          type="button"
          onClick={() => updateGoal(readingGoal - 1)}
          aria-label="Decrease reading goal"
          className="
            flex h-8 w-8
            items-center justify-center
            rounded-lg
            text-[var(--brown-700)]
            transition
            hover:bg-[var(--gold-light)]
          "
        >
          <Minus size={16} />
        </button>

        <div className="text-center">
          <p className="font-heading text-3xl font-semibold text-[var(--brown-800)] dark:text-[var(--text)]">
            {readingGoal}
          </p>

          <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
            books this year
          </p>
        </div>

        <button
          type="button"
          onClick={() => updateGoal(readingGoal + 1)}
          aria-label="Increase reading goal"
          className="
            flex h-8 w-8
            items-center justify-center
            rounded-lg
            text-[var(--brown-700)]
            transition
            hover:bg-[var(--gold-light)]
          "
        >
          <Plus size={16} />
        </button>
      </div>
    </Card>
  );
}
