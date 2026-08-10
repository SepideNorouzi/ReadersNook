import { useState } from "react";
import { Trophy } from "lucide-react";

import type { Achievement } from "../../types/achievement";
import { useAchievements } from "../../hooks/useAchievements";
import Card from "../../components/ui/Card";
import AchievementModal from "../../modals/AchievementModal";
import AchievementItem from "../dashboard/achievements/AchievementItem";

import "../../styles/achievement.css";

export default function AchievementsGrid() {
  const achievements = useAchievements();
  const [selected, setSelected] = useState<Achievement | null>(null);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progressPct =
    achievements.length > 0
      ? Math.round((unlockedCount / achievements.length) * 100)
      : 0;

  const sorted = [...achievements].sort(
    (a, b) => Number(b.unlocked) - Number(a.unlocked),
  );

  return (
    <Card className="achievements-shelf">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="achievements-case__header-icon" aria-hidden="true">
            <Trophy size={16} strokeWidth={2.4} />
          </span>
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
              Achievements
            </h2>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
              Your reading prize cabinet
            </p>
          </div>
        </div>

        <span className="achievements-case__count">
          <span aria-hidden="true">✦</span>
          {unlockedCount}/{achievements.length}
        </span>
      </div>

      <div
        className="achievements-case__progress mt-4"
        role="progressbar"
        aria-valuenow={progressPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${unlockedCount} of ${achievements.length} achievements unlocked`}
      >
        <div
          className="achievements-case__progress-bar"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {sorted.map((achievement) => (
          <AchievementItem
            key={achievement.id}
            achievement={achievement}
            showTitle
            onClick={() => setSelected(achievement)}
          />
        ))}
      </div>

      <AchievementModal
        achievement={selected}
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
      />
    </Card>
  );
}
