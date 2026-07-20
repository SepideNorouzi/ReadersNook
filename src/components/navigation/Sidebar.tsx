import { BookOpen, House, Library, Search, Settings } from "lucide-react";

const navItems = [
  {
    icon: House,
    label: "Dashboard",
    active: true,
  },
  {
    icon: Library,
    label: "Library",
  },
  {
    icon: BookOpen,
    label: "Collections",
  },
  {
    icon: Search,
    label: "Search",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen flex-col bg-[#FAF7F2] px-8 py-10">
      {/* ---------- Logo ---------- */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2C1810] text-white">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-[#2C1810]">
              Reader's Nook
            </h1>

            <p className="text-sm text-[#8B7355]">Reading Dashboard</p>
          </div>
        </div>
      </div>

      {/* ---------- Navigation ---------- */}

      <nav className="mt-14 flex flex-1 flex-col gap-2">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`
              flex
              items-center
              gap-4
              rounded-2xl
              px-4
              py-3
              text-left
              transition-all
              duration-200

              ${
                active
                  ? "bg-[#2C1810] text-white"
                  : "text-[#5C4B3A] hover:bg-[#EFE7DB]"
              }
            `}
          >
            <Icon size={20} />

            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* ---------- Footer ---------- */}

      <div className="border-t border-[#E7DED0] pt-6">
        <p className="text-xs uppercase tracking-[0.25em] text-[#B09B7A]">
          Demo Mode
        </p>

        <p className="mt-2 text-sm text-[#8B7355]">Using local mock data</p>
      </div>
    </aside>
  );
}
