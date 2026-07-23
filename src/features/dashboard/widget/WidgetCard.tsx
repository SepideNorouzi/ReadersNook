import hero from "../../../assets/hero.jpg";

interface WidgetCardProps {
  className?: string;
}

export default function WidgetCard({ className }: WidgetCardProps) {
  return (
    <div
      className={`
        group
        h-full
        overflow-hidden
        rounded-[28px]

        ${className ?? ""}
      `}
    >
      <img
        src={hero}
        alt="Reading corner"
        className="
          h-full
          w-full

          object-cover
          object-center

          transition-transform
          duration-[6000ms]
          ease-out

          group-hover:scale-105
        "
      />
    </div>
  );
}