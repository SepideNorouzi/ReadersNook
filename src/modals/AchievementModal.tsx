import { Lock, Sparkles, X } from "lucide-react";
import type { Achievement } from "../types/achievement";

import "../styles/achievement.css";

interface Props {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementModal({
  achievement,
  isOpen,
  onClose,
}: Props) {
  if (!isOpen || !achievement) return null;

  const { unlocked, title, description, icon, id } = achievement;

  return (
    <>
      <div
        onClick={onClose}
        className="
          achievement-modal__backdrop
          fixed inset-0 z-40
          bg-black/45
          backdrop-blur-md
          animate-in fade-in duration-200
        "
      />

      <div
        className="
          achievement-modal
          fixed left-1/2 top-1/2 z-50
          w-[390px] max-w-[92vw]
          -translate-x-1/2 -translate-y-1/2
          overflow-hidden
          rounded-[30px]
          animate-in zoom-in-95 duration-200
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-modal-title"
      >
        {unlocked && (
          <div className="achievement-modal__confetti" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            achievement-modal__close
            absolute right-5 top-5 z-10
            rounded-full p-2
            transition-all duration-200
            hover:bg-[var(--stone-100)]
          "
        >
          <X size={18} className="text-[var(--text-secondary)]" />
        </button>

        <div className="achievement-modal__content relative z-[2] p-8 pt-10">
          {/* Prize medal on pedestal */}
          <div className="achievement-modal__badge-wrapper">
            <div
              className={`
                achievement-badge
                achievement-modal__badge
                badge-${id}
                ${unlocked ? "achievement-badge--unlocked" : "achievement-badge--locked"}
              `}
            >
              <span className="achievement-badge__aura" aria-hidden="true" />
              <span className="achievement-badge__rim" aria-hidden="true">
                <span className="achievement-badge__rim-inner" />
              </span>
              <span className="achievement-badge__face">
                <span className="achievement-badge__icon-wrapper">
                  <img
                    src={icon}
                    alt=""
                    className="achievement-badge__image achievement-modal__image"
                  />
                </span>
                <span className="achievement-badge__shine" aria-hidden="true" />
              </span>
              <span className="achievement-badge__sparkles" aria-hidden="true">
                <span className="achievement-badge__sparkle achievement-badge__sparkle--1" />
                <span className="achievement-badge__sparkle achievement-badge__sparkle--2" />
                <span className="achievement-badge__sparkle achievement-badge__sparkle--3" />
                <span className="achievement-badge__sparkle achievement-badge__sparkle--4" />
              </span>
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
            </div>
          </div>

          <div className="achievement-modal__pedestal" aria-hidden="true" />

          <span
            className={`
              achievement-modal__status
              ${unlocked
                ? "achievement-modal__status--unlocked"
                : "achievement-modal__status--locked"}
            `}
          >
            {unlocked ? (
              <>
                <Sparkles size={12} strokeWidth={2.5} />
                Unlocked
              </>
            ) : (
              <>
                <Lock size={11} strokeWidth={2.5} />
                Locked
              </>
            )}
          </span>

          <p
            id="achievement-modal-title"
            className="achievement-badge__title achievement-modal__title"
          >
            {title}
          </p>

          <div className="achievement-modal__divider" />

          <div className="achievement-modal__body">
            <p className="achievement-modal__label">
              {unlocked ? "Prize earned" : "How to unlock"}
            </p>
            <p className="achievement-modal__description">{description}</p>
          </div>

          <div className="achievement-modal__footer">
            <p className="achievement-modal__footer-text">
              {unlocked
                ? "A new jewel in your reading crown. Keep turning pages — greater prizes await."
                : "Every milestone on your reading journey becomes a prize. Keep going to unlock this one."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
