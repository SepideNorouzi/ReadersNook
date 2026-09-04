import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import "../../styles/AvatarPicker.css";

export type AvatarOption = {
  id: string;
  src: string;
  name: string;
};

export const avatarOptions: AvatarOption[] = [
  {
    id: "avatar-01",
    src: "/avatars/00.png",
    name: "The Dreamer",
  },
  {
    id: "avatar-02",
    src: "/avatars/01.png",
    name: "The Curious Reader",
  },
  {
    id: "avatar-03",
    src: "/avatars/02.png",
    name: "The Adventurer",
  },
  {
    id: "avatar-04",
    src: "/avatars/03.png",
    name: "The Scholar",
  },
  {
    id: "avatar-05",
    src: "/avatars/04.png",
    name: "The Storyteller",
  },
  {
    id: "avatar-06",
    src: "/avatars/05.png",
    name: "The Bookworm",
  },
];

interface Props {
  currentAvatar?: string | null;
  onSelect: (avatarId: string) => void;
  onClose?: () => void;
}

export default function AvatarPicker({
  currentAvatar,
  onSelect,
  onClose,
}: Props) {
  const initialIndex = Math.max(
    avatarOptions.findIndex((avatar) => avatar.src === currentAvatar),
    0,
  );

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const selectedAvatar = avatarOptions[selectedIndex];

  const getWrappedIndex = (index: number) => {
    return (index + avatarOptions.length) % avatarOptions.length;
  };

  const goNext = () => {
    setDirection("next");
    setSelectedIndex((current) => getWrappedIndex(current + 1));
  };

  const goPrevious = () => {
    setDirection("prev");
    setSelectedIndex((current) => getWrappedIndex(current - 1));
  };

  const selectAvatar = () => {
    onSelect(selectedAvatar.src);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    touchEndX.current = event.changedTouches[0].clientX;

    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < 40) {
      return;
    }

    if (distance > 0) {
      goNext();
    } else {
      goPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }

      if (event.key === "Enter") {
        selectAvatar();
      }

      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const previousIndex = getWrappedIndex(selectedIndex - 1);
  const nextIndex = getWrappedIndex(selectedIndex + 1);

  const previousAvatar = avatarOptions[previousIndex];
  const nextAvatar = avatarOptions[nextIndex];

  return (
    <div className="avatar-picker">
      <div className="avatar-picker-header">
        <div>
          <div className="avatar-picker-eyebrow">
            <Sparkles size={12} fill="currentColor" />
            Choose your reader
          </div>

          <h3 className="avatar-picker-title hidden lg:block sm:block">
            Pick your avatar
          </h3>

          <p className="avatar-picker-description hidden lg:block sm:block">
            Choose the character that feels most like you.
          </p>
        </div>

        <span className="avatar-picker-count">
          {selectedIndex + 1} / {avatarOptions.length}
        </span>
      </div>

      <div
        className={`avatar-carousel avatar-carousel-${direction}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          aria-label="Previous avatar"
          className="avatar-carousel-button avatar-carousel-button-left"
          onClick={goPrevious}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="avatar-carousel-stage">
          <div className="avatar-side avatar-side-left">
            <img src={previousAvatar.src} alt="" draggable={false} />
          </div>

          <div className="avatar-active-wrapper">
            <div className="avatar-active-ring">
              <img
                key={`${selectedAvatar.id}-${direction}`}
                src={selectedAvatar.src}
                alt={selectedAvatar.name}
                draggable={false}
                className="avatar-active-image"
              />
            </div>

            <div className="avatar-selected-badge">
              <Check size={13} strokeWidth={3} />
              Selected
            </div>
          </div>

          <div className="avatar-side avatar-side-right">
            <img src={nextAvatar.src} alt="" draggable={false} />
          </div>
        </div>

        <button
          type="button"
          aria-label="Next avatar"
          className="avatar-carousel-button avatar-carousel-button-right"
          onClick={goNext}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="avatar-name">{selectedAvatar.name}</div>

      <div className="avatar-dots">
        {avatarOptions.map((avatar, index) => (
          <button
            key={avatar.id}
            type="button"
            aria-label={`Choose ${avatar.name}`}
            className={`avatar-dot ${
              index === selectedIndex ? "is-active" : ""
            }`}
            onClick={() => {
              setDirection(index > selectedIndex ? "next" : "prev");

              setSelectedIndex(index);
            }}
          />
        ))}
      </div>

      <div className="avatar-picker-actions">
        <button
          type="button"
          className="avatar-confirm-button"
          onClick={selectAvatar}
        >
          <Check size={17} strokeWidth={2.5} />
          Use this avatar
        </button>

        {onClose && (
          <button
            type="button"
            className="avatar-cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
      </div>

      <p className="avatar-picker-hint">Swipe left or right to explore</p>
    </div>
  );
}
