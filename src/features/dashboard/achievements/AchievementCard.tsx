import { useState } from "react";

import Card from "../../../components/ui/Card";
import { useAchievements } from "../../../hooks/useAchievements";

import AchievementItem from "./AchievementItem";

import type { Achievement } from "../../../types/achievement";

import AchievementModal from "../../../modals/AchievementModal";

interface AchievementCardProps {
  className?: string;
}

export default function AchievementCard({ className }: AchievementCardProps) {
  const achievements = useAchievements();

  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  // show unlocked ones on top
  const sortedAchievements = [...achievements].sort(
    (a, b) => Number(b.unlocked) - Number(a.unlocked),
  );

  return (
    <>
      <Card
        className={`
          h-full
          min-h-0
          flex
          flex-col

          ${className ?? ""}
        `}
      >
        {/* Header */}

        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
            Achievements
          </h2>

          <span
            className="
              rounded-full

              bg-[var(--stone-100)]

              px-2.5
              py-1

              text-xs
              font-medium

              text-[var(--text-secondary)]
            "
          >
            {achievements.filter((achievement) => achievement.unlocked).length}/
            {achievements.length}
          </span>
        </div>

        {/* Grid */}

        <div className="relative flex-1 overflow-hidden">
          <div
            className="
              scrollbar-hidden

              h-full
              overflow-y-auto

              pr-1
            "
          >
            <div className="grid grid-cols-3 gap-3">
              {sortedAchievements.map((achievement) => (
                <AchievementItem
                  key={achievement.id}
                  achievement={achievement}
                  onClick={() => setSelectedAchievement(achievement)}
                />
              ))}
            </div>
          </div>

          {/* Fade */}

          <div
            className="
              pointer-events-none

              absolute
              bottom-0
              left-0
              right-0

              h-12

              bg-gradient-to-t
              from-white
              to-transparent
            "
          />
        </div>
      </Card>

      {/* Modal */}

      <AchievementModal
        achievement={selectedAchievement}
        isOpen={selectedAchievement !== null}
        onClose={() => setSelectedAchievement(null)}
      />
    </>
  );
}
