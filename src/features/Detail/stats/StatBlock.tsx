import type { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

export default function StatBlock({ label, children }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center">
      <p
        className="
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-[var(--gold)]

          sm:text-[10px]
          sm:tracking-[0.16em]
        "
      >
        {label}
      </p>

      {children}
    </div>
  );
}