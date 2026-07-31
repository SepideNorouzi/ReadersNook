import clsx from "clsx";
import { type ReactNode, type MouseEventHandler } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Card({ children, className, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-3xl bg-white p-6 shadow-sm border border-[#E6DDCF] transition-all hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
