import type { LucideIcon } from "lucide-react";

interface HeroStat {
  icon: LucideIcon;
  value: number;
  label: string;
}

interface HeroStatsProps {
  stats: HeroStat[];
}

export default function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div
      className="
        inline-flex
        items-stretch

        divide-x
        divide-black/5

        overflow-hidden

        rounded-2xl
        border
        border-white/50

        bg-white/55
        backdrop-blur-xl

        shadow-[0_8px_30px_-8px_rgba(59,40,31,0.25)]
      "
    >
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1.5

            px-4
            py-3

            sm:px-6
            sm:py-4
          "
        >
          <Icon size={15} strokeWidth={2} className="text-[#ae794c]" />

          <span
            className="
              text-lg
              sm:text-2xl

              font-bold
              leading-none
              tabular-nums

              text-[#241812]
            "
          >
            {value}
          </span>

          <span
            className="
              text-[9px]
              sm:text-[10px]

              font-semibold
              uppercase
              tracking-[0.08em]

              text-[#8a7a6d]
            "
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}