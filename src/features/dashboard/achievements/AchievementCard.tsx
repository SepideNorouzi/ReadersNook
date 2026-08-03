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

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <>
      <Card
        className={`
          h-full
          min-h-0
          flex
          flex-col

          rounded-[22px]
          sm:rounded-[28px]

          p-3.5
          sm:p-4
          lg:p-6

          ${className ?? ""}
        `}
      >
        {/* Header */}
        <div className="mb-2.5 flex shrink-0 items-center justify-between sm:mb-3">
          <h2 className="font-heading text-sm font-semibold text-[var(--text)] sm:text-[15px] lg:text-lg">
            Achievements
          </h2>

          <span
            className="
              rounded-full
              bg-[var(--stone-100)]
              px-2
              py-0.5
              sm:px-2.5
              sm:py-1
              text-[10px]
              sm:text-xs
              font-medium
              text-[var(--text-secondary)]
            "
          >
            {unlockedCount}/{achievements.length}
          </span>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className="
              h-full
              overflow-y-auto
              p-0.5
              sm:p-1
              scrollbar-hidden
            "
          >
            {/*
              Mobile (full-width): 4 compact columns
              md tablet half-card / desktop: 3 columns
            */}
            <div
              className="
                grid
                grid-cols-4
                gap-2

                sm:grid-cols-4
                sm:gap-2.5

                md:grid-cols-3
                md:gap-3
              "
            >
              {sortedAchievements.map((achievement) => (
                <AchievementItem
                  key={achievement.id}
                  achievement={achievement}
                  onClick={() => setSelectedAchievement(achievement)}
                />
              ))}
            </div>
          </div>

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              right-0
              h-10
              bg-gradient-to-t
              from-white
              to-transparent
            "
          />
        </div>
      </Card>

      <AchievementModal
        achievement={selectedAchievement}
        isOpen={selectedAchievement !== null}
        onClose={() => setSelectedAchievement(null)}
      />
    </>
  );
}
