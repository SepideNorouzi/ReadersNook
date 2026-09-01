import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  right?: ReactNode;
}

export default function SectionHeading({ eyebrow, title, right }: Props) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p
          className="
            mb-3
            text-xs
            uppercase
            tracking-[0.3em]
            text-stone-500
          "
        >
          {eyebrow}
        </p>

        <h2
          className="
            font-serif
            text-2xl
            text-brown-900
            sm:text-3xl
          "
        >
          {title}
        </h2>
      </div>

      {right}
    </div>
  );
}
