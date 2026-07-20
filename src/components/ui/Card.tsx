import clsx from "clsx";
import {type ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function Card({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white p-6 shadow-sm border border-[#E6DDCF] transition-all hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
