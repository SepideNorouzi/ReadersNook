import Card from "../../../components/ui/Card";
import { useAchievements } from "../../../hooks/useAchievements";
import AchievementItem from "./AchievementItem";

interface AchievementCardProps {
  className?: string;
}

export default function AchievementCard({ className }: AchievementCardProps) {
  const achievements = useAchievements();

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
              key={achievement.id}
              title={achievement.title}
              icon={achievement.icon}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
