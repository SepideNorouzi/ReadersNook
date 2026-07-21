import { BookOpen } from "lucide-react";
import { NavLink, useLocation } from "react-router";

import { navItems } from "./NavItem";

export default function Sidebar() {
  const location = useLocation();

  const currentPage =
    navItems.find((item) => item.path === location.pathname) ?? navItems[0];

  return (
    <aside className="sticky top-0 flex h-screen flex-col bg-[#FAF7F2] px-8 py-10">
      {/* ---------- Logo ---------- */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2C1810] text-white">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-lg font-heading font-semibold text-[#2C1810]">
              Reader's Nook
            </h1>

            <p className="text-sm text-[#8B7355]">{currentPage.subtitle}</p>
          </div>
        </div>
      </div>

      {/* ---------- Navigation ---------- */}

      <nav className="mt-14 flex flex-1 flex-col gap-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;

          return (
            <NavLink
              key={path}
              to={path}
              className={`
                flex
                items-center
                gap-4
                rounded-2xl
                px-4
                py-3
                transition-all
                duration-200

                ${
                  active
                    ? "bg-[#2C1810] text-white shadow-sm"
                    : "text-[#5C4B3A] hover:bg-[#EFE7DB]"
                }
              `}
            >
              <Icon size={20} />

              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          );
        })}
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
