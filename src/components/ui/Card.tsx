import clsx from "clsx";
import { type HTMLAttributes, type ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export default function Card({
  children,
  className,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className={clsx(
        `
          stamp-card
          rounded-3xl
          p-6

          shadow-[var(--shadow-premium)]

          transition-all
          duration-300
          ease-out

          hover:-translate-y-1
          hover:shadow-[var(--shadow-premium-hover)]
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}