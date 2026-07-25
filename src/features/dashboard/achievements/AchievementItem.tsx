interface Props {
  title: string;
  icon: string;
}

export default function AchievementItem({ title, icon }: Props) {
  return (
    <div
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
