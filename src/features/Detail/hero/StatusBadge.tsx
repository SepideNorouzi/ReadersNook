import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import type { BookStatus } from "../../../types/book";

interface Props {
  value: BookStatus;
  onChange: (status: BookStatus) => void;
}

const STATUS_OPTIONS: {
  value: BookStatus;
  label: string;
  dot: string;
}[] = [
  {
    value: "current",
    label: "Currently Reading",
    dot: "bg-[#C68B3C]",
  },
  {
    value: "tbr",
    label: "Want to Read",
    dot: "bg-[#4B9CE2]",
  },
  {
    value: "read",
    label: "Finished",
    dot: "bg-[#4BAE6C]",
  },
];

export default function StatusBadge({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current =
    STATUS_OPTIONS.find((status) => status.value === value) ??
    STATUS_OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          group
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-[#E7DED5]
          bg-[#FBF8F4]
          px-3.5
          py-1.5
          text-sm
          shadow-sm
          transition-all
          hover:border-[#C9B39A]
          hover:bg-white
        "
      >
        <span className={`h-2 w-2 rounded-full ${current.dot}`} />

        <span className="font-medium text-stone-700">{current.label}</span>

        <ChevronDown
          className={`
            h-3.5
            w-3.5
            text-stone-500
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-52
            overflow-hidden
            rounded-2xl
            border
            border-stone-200
            bg-white
            shadow-xl
            z-0
          "
        >
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              onClick={() => {
                onChange(status.value);
                setOpen(false);
              }}
              className={`
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-left
                text-sm
                transition-colors
                hover:bg-stone-100
                ${status.value === value ? "bg-stone-50 font-semibold" : ""}
              `}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />

              {status.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
