import { X } from "lucide-react";
import type { Achievement } from "../types/achievement";

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
          fixed
          inset-0
          z-40

          bg-black/40
          backdrop-blur-sm

          animate-in
          fade-in
          duration-200
        "
      />

      {/* Modal */}
      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-50

          w-[360px]
          max-w-[92vw]

          -translate-x-1/2
          -translate-y-1/2

          rounded-3xl
          border
          border-[var(--border)]

          bg-white

          shadow-2xl

          animate-in
          zoom-in-95
          duration-200
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5

            rounded-full
            p-2

            text-[var(--muted)]

            transition-all
            duration-200

            hover:bg-[var(--stone-100)]
            hover:text-[var(--text)]
          "
        >
          <X size={18} />
        </button>

        <div className="p-8">
          {/* Badge */}
          <div className="flex justify-center">
            <div
              className="
                flex
                h-28
                w-28
                items-center
                justify-center

                rounded-[28px]

                border
                border-[var(--border)]

                bg-gradient-to-br
                from-amber-50
                via-white
                to-stone-100

                shadow-lg
              "
            >
              <img
                src={achievement.icon}
                alt={achievement.title}
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h2
            className="
              mt-6

              text-center

              font-heading
              text-2xl
              font-semibold

              text-[var(--text)]
            "
          >
            {achievement.title}
          </h2>

          {/* Status */}
          <div className="mt-4 flex justify-center">
            {achievement.unlocked ? (
              <span
                className="
                  rounded-full

                  bg-emerald-100

                  px-4
                  py-1.5

                  text-xs
                  font-semibold
                  tracking-wide

                  text-emerald-700
                "
              >
                ✓ UNLOCKED
              </span>
            ) : (
              <span
                className="
                  rounded-full

                  bg-stone-100

                  px-4
                  py-1.5

                  text-xs
                  font-semibold
                  tracking-wide

                  text-stone-600
                "
              >
                🔒 LOCKED
              </span>
            )}
          </div>

          {/* Divider */}
          <div
            className="
              my-7
              h-px
              bg-gradient-to-r
              from-transparent
              via-[var(--border)]
              to-transparent
            "
          />

          {/* Description */}
          <div className="space-y-2 text-center">
            <p
              className="
                text-xs

                uppercase

                tracking-[0.2em]

                text-[var(--muted)]
              "
            >
              Achievement
            </p>

            <p
              className="
                leading-7

                text-sm

                text-[var(--text)]
              "
            >
              {achievement.description}
            </p>
          </div>

          {/* Footer */}
          <div
            className="
              mt-8

              rounded-2xl

              border
              border-[var(--border)]

              bg-[var(--stone-50)]

              p-4
            "
          >
            <p
              className="
                text-center

                text-xs

                text-[var(--muted)]
              "
            >
              Every achievement marks another milestone in your reading journey.
              Keep exploring your library to discover more.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
