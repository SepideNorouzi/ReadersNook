// src/features/Settings/AchievementsGrid.tsx
import { useState } from "react";

import type { Achievement } from "../../types/achievement";
import { useAchievements } from "../../hooks/useAchievements";
import Card from "../../components/ui/Card";
import AchievementModal from "../../modals/AchievementModal";

import "../../styles/achievement.css";

export default function AchievementsGrid() {
  const achievements = useAchievements();
  const [selected, setSelected] = useState<Achievement | null>(null);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <Card>
      <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
        Achievements
      </h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        {unlockedCount} of {achievements.length} unlocked
      </p>

      <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {achievements.map((achievement) => (
          <button
            key={achievement.id}
            type="button"
            onClick={() => setSelected(achievement)}
            className={`
              flex flex-col items-center gap-2 rounded-2xl p-3
              transition-all duration-200 hover:bg-[var(--stone-100)]
              ${achievement.unlocked ? "" : "opacity-40 grayscale"}
            `}
          >
            <div
              className={`achievement-badge badge-${achievement.id} h-14 w-14`}
            >
              <div className="achievement-badge__icon-wrapper">
                <img
                  src={achievement.icon}
                  alt={achievement.title}
                  className="achievement-badge__image"
                />
              </div>
            </div>
            <span className="line-clamp-2 text-center text-[11px] font-medium text-[var(--text-secondary)]">
              {achievement.title}
            </span>
          </button>
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
