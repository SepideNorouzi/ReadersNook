import { BookOpen, BookMarked, Library as LibraryIcon } from "lucide-react";

import type { Book } from "../../types/book";
import Card from "../../components/ui/Card";

interface Props {
  books: Book[];
}

export default function ProfileStats({ books }: Props) {
  const stats = [
    {
      label: "Books Read",
      value: books.filter((b) => b.status === "read").length,
      icon: BookOpen,
      iconBg: "bg-[var(--green-light)]",
      iconColor: "text-[var(--green)]",
    },
    {
      label: "Currently Reading",
      value: books.filter((b) => b.status === "current").length,
      icon: BookMarked,
      iconBg: "bg-[var(--gold-light)]",
      iconColor: "text-[var(--brown-700)]",
    },
    {
      label: "To Be Read",
      value: books.filter((b) => b.status === "tbr").length,
      icon: LibraryIcon,
      iconBg: "bg-[var(--orange-light)]",
      iconColor: "text-[var(--orange)]",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
        <Card
          key={label}
          className="
            relative overflow-hidden
            flex min-w-0 flex-col
            gap-3
            rounded-[20px]
            border border-[var(--brown-200)]
            bg-[var(--surface)]
            p-3.5
            shadow-[0_6px_18px_rgba(35,23,17,0.05)]
            sm:flex-row
            sm:items-center
            sm:p-4
          "
        >
          <div
            className={`
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              ${iconBg}
              ${iconColor}
              sm:h-11 sm:w-11
            `}
          >
            <Icon size={18} />
          </div>

          <div className="min-w-0">
            <p className="text-lg font-semibold text-[var(--text)] sm:text-xl">
              {value}
            </p>

            <p className="line-clamp-2 text-[9px] leading-tight text-[var(--text-secondary)] sm:text-xs">
              {label}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}