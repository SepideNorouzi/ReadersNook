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

  const unlocked = achievements.filter((achievement) => achievement.unlocked);

  return (
    <Card className={`${className}`}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
          Achievements
        </h2>
      </div>
      {unlocked.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          Read books to unlock your first badge!
        </p>
      ) : (
        <div
          className="
            grid
            grid-cols-3
            gap-3
          "
        >
          {unlocked.map((achievement) => (
            <AchievementItem
              achievement={achievement}
              onClick={() => setSelectedAchievement(achievement)}
            />
          ))}
        </div>
      )}
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={selectedAchievement !== null}
        onClose={() => setSelectedAchievement(null)}
      />
    </Card>
  );
}
