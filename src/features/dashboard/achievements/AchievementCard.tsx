import { useState } from "react";
import { Trophy } from "lucide-react";

import Card from "../../../components/ui/Card";
import { useAchievements } from "../../../hooks/useAchievements";

import AchievementItem from "./AchievementItem";

import type { Achievement } from "../../../types/achievement";

import AchievementModal from "../../../modals/AchievementModal";

import "../../../styles/achievement.css";

interface AchievementCardProps {
  className?: string;
}

export default function AchievementCard({ className }: AchievementCardProps) {
  const achievements = useAchievements();

  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const sortedAchievements = [...achievements].sort(
    (a, b) => Number(b.unlocked) - Number(a.unlocked),
  );

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progressPct =
    achievements.length > 0
      ? Math.round((unlockedCount / achievements.length) * 100)
      : 0;

  return (
    <>
      <Card
        className={`
          achievements-case
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
        <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2 sm:mb-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <span className="achievements-case__header-icon" aria-hidden="true">
              <Trophy size={14} strokeWidth={2.4} />
            </span>
            <div className="min-w-0">
              <h2 className="font-heading text-sm font-semibold text-[var(--text)] sm:text-[15px] lg:text-lg">
                Achievements
              </h2>
              <p className="hidden text-[10px] text-[var(--text-muted)] sm:block sm:text-[11px]">
                Your reading prize cabinet
              </p>
            </div>
          </div>

          <span className="achievements-case__count">
            <span aria-hidden="true">✦</span>
            {unlockedCount}/{achievements.length}
          </span>
        </div>

        {/* Progress rail */}
        <div
          className="achievements-case__progress shrink-0"
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

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className="
              h-full
              overflow-y-auto
              p-1
              sm:p-1.5
              scrollbar-hidden
            "
          >
            <div
              className="
                achievements-case__grid
                grid
                grid-cols-4
                gap-2.5

                sm:grid-cols-4
                sm:gap-3

                md:grid-cols-3
                md:gap-3.5
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
              achievements-case__fade
              pointer-events-none
              absolute
              bottom-0
              left-0
              right-0
              h-10
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
