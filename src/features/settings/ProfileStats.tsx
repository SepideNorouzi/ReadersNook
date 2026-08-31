import { BookOpen, BookMarked, Library as LibraryIcon } from "lucide-react";

import type { Book } from "../../types/book";
import Card from "../../components/ui/Card";

interface Props {
  books: Book[];
}

export default function ProfileStats({ books }: Props) {
  const read = books.filter((b) => b.status === "read").length;
  const current = books.filter((b) => b.status === "current").length;
  const tbr = books.filter((b) => b.status === "tbr").length;

  const stats = [
    {
      label: "Books Read",
      value: read,
      icon: BookOpen,
      iconBg: "bg-[var(--green-light)]",
      iconColor: "text-[var(--green)]",
    },
    {
      label: "Currently Reading",
      value: current,
      icon: BookMarked,
      iconBg: "bg-[var(--gold-light)]",
      iconColor: "text-[var(--brown-700)]",
    },
    {
      label: "To Be Read",
      value: tbr,
      icon: LibraryIcon,
      iconBg: "bg-[var(--orange-light)]",
      iconColor: "text-[var(--orange)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
        <Card key={label} className="flex items-center gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
          >
            <Icon size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-[var(--text)]">{value}</p>
            <p className="text-xs text-[var(--text-secondary)]">{label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}