import type { BookStatus } from "../../../types/book";

export const STATUS_OPTIONS: {
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
