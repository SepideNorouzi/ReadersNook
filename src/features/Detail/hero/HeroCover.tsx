import type { CSSProperties } from "react";

interface Props {
  cover: string;
  title: string;
  shadow: string;
}

export default function HeroCover({ cover, title, shadow }: Props) {
  return (
    <div
      className="
      absolute
      z-30

      w-[180px]
      aspect-[2/3]

      overflow-hidden

      rounded-[22px]

      border
      border-white/30

      left-6
      bottom-[-70px]

      lg:w-[260px]

      lg:left-[210px]
      lg:top-1/2
      lg:bottom-auto
      lg:-translate-y-1/2
      "
      style={
        {
          "--cover-shadow": shadow,
          boxShadow: "0 40px 80px var(--cover-shadow)",
        } as CSSProperties
      }
    >
      <img src={cover} alt={title} className="h-full w-full object-cover" />
    </div>
  );
}
