import type { Achievement } from "../../../types/achievement";

interface Props {
  achievement: Achievement;
  onClick: () => void;
}

export default function AchievementItem({ achievement, onClick }: Props) {
  const { icon, title } = achievement;
  
  return (
    <div
      onClick={onClick}
      className="
        flex
        flex-col
        items-center

        gap-2

        rounded-xl
        border
        border-[var(--border)]

        bg-[var(--card)]

        p-3

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="text-3xl">{icon}</div>

      <p
        className="
          text-[10px]
          lg:text-xs

          font-heading
          font-medium

          text-center
          leading-snug
        "
      >
        {title}
      </p>
    </div>
  );
}
