import type { Achievement } from "../../../types/achievement";
import "../../../styles/achievement.css";

interface Props {
  achievement: Achievement;
  onClick: () => void;
  /** Show title under the medal (settings grid). */
  showTitle?: boolean;
  className?: string;
}

export default function AchievementItem({
  achievement,
  onClick,
  showTitle = false,
  className = "",
}: Props) {
  const { icon, title, id, unlocked } = achievement;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${title}${unlocked ? " — unlocked" : " — locked"}`}
      className={`
        achievement-prize
        ${showTitle ? "achievement-prize--with-title" : ""}
        ${className}
      `}
    >
      <span
        className={`
          achievement-badge
          badge-${id}
          ${!unlocked ? "achievement-badge--locked" : "achievement-badge--unlocked"}
        `}
      >
        {/* Ambient aura behind the medal */}
        <span className="achievement-badge__aura" aria-hidden="true" />

        {/* Outer metallic bezel */}
        <span className="achievement-badge__rim" aria-hidden="true">
          <span className="achievement-badge__rim-inner" />
        </span>

        {/* Medal face / gem */}
        <span className="achievement-badge__face">
          <span className="achievement-badge__icon-wrapper">
            <img src={icon} alt="" className="achievement-badge__image" />
          </span>
          <span className="achievement-badge__shine" aria-hidden="true" />
        </span>

        {/* Floating sparkles */}
        <span className="achievement-badge__sparkles" aria-hidden="true">
          <span className="achievement-badge__sparkle achievement-badge__sparkle--1" />
          <span className="achievement-badge__sparkle achievement-badge__sparkle--2" />
          <span className="achievement-badge__sparkle achievement-badge__sparkle--3" />
          <span className="achievement-badge__sparkle achievement-badge__sparkle--4" />
        </span>

        {/* Ribbon tails */}
        <span className="achievement-badge__ribbon" aria-hidden="true">
          <span className="achievement-badge__ribbon-left" />
          <span className="achievement-badge__ribbon-right" />
        </span>

        {!unlocked && (
          <span className="achievement-badge__lock" aria-hidden="true">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
        )}
      </span>

      {showTitle && <span className="achievement-badge__title">{title}</span>}
    </button>
  );
}
