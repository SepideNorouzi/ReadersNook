import clsx from "clsx";
import { type HTMLAttributes, type ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export default function Card({ children, className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={clsx(
        "rounded-3xl bg-white p-6 shadow-sm border border-[#E6DDCF] transition-all hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
