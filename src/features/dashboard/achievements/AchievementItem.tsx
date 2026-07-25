import type { Achievement } from "../../../types/achievement";
import "../../../styles/achievement.css";

interface Props {
  achievement: Achievement;
  onClick: () => void;
}

export default function AchievementItem({ achievement, onClick }: Props) {
  const { icon, title, id, unlocked } = achievement;

  return (
    <button
      onClick={onClick}
      className={`
        achievement-badge
        badge-${id}
        ${!unlocked ? "achievement-badge--locked" : ""}
      `}
    >

      {/* Icon */}
      <div className="achievement-badge__icon-wrapper">
        <img src={icon} alt={title} className="achievement-badge__image" />
      </div>

    </button>
  );
}
