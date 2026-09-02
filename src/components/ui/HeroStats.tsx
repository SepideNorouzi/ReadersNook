import { Fragment } from "react";
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
    <div className="inline-flex items-center">
      {stats.map(({ icon: Icon, value, label }, index) => (
        <Fragment key={label}>
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1.5

              px-4

              sm:px-8
            "
          >
            <Icon size={18} strokeWidth={2} className="text-[#ae794c]" />

            <span
              className="
                text-xs
                sm:text-xl

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

          {index < stats.length - 1 && (
            <span
              aria-hidden="true"
              className="
                h-4
                sm:h-8

                w-px

                bg-[#241812]/15
              "
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}