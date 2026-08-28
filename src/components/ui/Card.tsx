import clsx from "clsx";
import { type HTMLAttributes, type ReactNode } from "react";
import "../../styles/card.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export default function Card({ children, className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={clsx(
        "stamp-card rounded-3xl p-6 shadow-sm transition-all hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}