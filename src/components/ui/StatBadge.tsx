import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  value: number | string;
  label: string;
}

export default function StatBadge({ icon: Icon, value, label }: Props) {
  return (
    <div
      className="
        flex
        shrink-0
        items-center
        gap-2

        rounded-full

        border
        border-[var(--border)]

        bg-white/10

        px-3
        py-2

        backdrop-blur-sm

        transition-all
        duration-300

        hover:bg-white/20
      "
    >
      <Icon size={16} strokeWidth={1.7} className="text-[var(--brown-500)]" />

      <div className="leading-none">
        <p
          className="
            text-sm
            font-semibold
            text-[var(--text)]
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            text-[9px]
            uppercase
            tracking-[0.14em]
            text-[var(--text-muted)]
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}
