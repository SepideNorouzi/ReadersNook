import { X } from "lucide-react";
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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="
          achievement-modal__backdrop

          fixed
          inset-0
          z-40

          bg-black/40
          backdrop-blur-md

          animate-in
          fade-in
          duration-200
        "
      />

      {/* Modal */}
      <div
        className="
          achievement-modal

          fixed
          left-1/2
          top-1/2
          z-50

          w-[390px]
          max-w-[92vw]

          -translate-x-1/2
          -translate-y-1/2

          overflow-hidden

          rounded-[30px]

          border
          border-[var(--border)]

          bg-white

          shadow-2xl

          animate-in
          zoom-in-95
          duration-200
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            achievement-modal__close

            absolute
            right-5
            top-5

            rounded-full

            p-2

            transition-all
            duration-200

            hover:bg-[var(--stone-100)]
          "
        >
          <X size={18} className="text-[var(--text-secondary)]" />
        </button>

        <div className="achievement-modal__content p-8">
          {/* Badge */}

          <div className="achievement-modal__badge-wrapper">
            <div
              className={`
                achievement-badge
                achievement-modal__badge
                badge-${achievement.id}
              `}
            >
              <div className="achievement-badge__icon-wrapper">
                <img
                  src={achievement.icon}
                  alt={achievement.title}
                  className="achievement-badge__image achievement-modal__image"
                />
              </div>
            </div>
          </div>

          {/* title */}

          <p className="achievement-badge__title achievement-modal__title pt-5">
            {achievement.title}
          </p>

          {/* Divider */}

          <div className="achievement-modal__divider" />

          {/* Description */}

          <div className="achievement-modal__body">
            <p className="achievement-modal__label">Achievement</p>

            <p className="achievement-modal__description">
              {achievement.description}
            </p>
          </div>

          {/* Footer */}

          <div className="achievement-modal__footer">
            <p className="achievement-modal__footer-text">
              Every achievement marks another milestone in your reading journey.
              Keep exploring your library to discover more.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
