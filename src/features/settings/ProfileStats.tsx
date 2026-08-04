// src/features/Settings/ProfileStats.tsx
import { BookOpen, BookMarked, Library as LibraryIcon } from "lucide-react";

import type { Book } from "../../types/book";
import Card from "../../components/ui/Card";

interface Props {
  books: Book[];
}

export default function ProfileStats({ books }: Props) {
  const read = books.filter((b) => b.status === "read").length;
  const current = books.filter((b) => b.status === "current").length;

  const pagesTurned = books.reduce((sum, b) => {
    if (b.status === "read") return sum + b.totalPages;
    if (b.status === "current") return sum + b.currentPage;
    return sum;
  }, 0);

  const stats = [
    { label: "Books Read", value: read, icon: BookOpen },
    { label: "Currently Reading", value: current, icon: BookMarked },
    { label: "Pages Turned", value: pagesTurned.toLocaleString(), icon: LibraryIcon },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--stone-100)] text-[var(--brown-700)]">
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