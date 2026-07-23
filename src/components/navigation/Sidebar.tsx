import { BookOpen } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { navItems } from "./NavItem";

export default function Sidebar() {
  const location = useLocation();
  const currentPage =
    navItems.find((item) => item.path === location.pathname) ?? navItems[0];

  return (
    <aside
      className="
sticky top-0
flex h-screen flex-col
bg-[var(--surface)]
px-8 py-10
border-r border-[var(--border)]
shadow-[18px_0_40px_rgba(54,35,27,0.06)]
"
    >
      {/* ---------- Logo ---------- */}
      <div className="flex items-center gap-3">
        <div
          className="
flex h-12 w-12
items-center justify-center
rounded-2xl
bg-gradient-to-br
from-[var(--brown-900)]
via-[var(--brown-700)]
to-[var(--brown-500)]
text-white
shadow-[0_12px_30px_rgba(54,35,27,.28),inset_0_1px_1px_rgba(255,255,255,.18)]
"
        >
          <BookOpen size={22} />
        </div>
        <div>
          <h1 className="text-lg font-heading font-semibold text-[var(--text)]">
            Reader's Nook
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="mt-14 flex flex-1 flex-col gap-1.5">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={`
                group relative flex items-center gap-4 rounded-2xl px-4 py-3
                transition-all duration-200 ease-out
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--bg)]
                ${
                  active
                    ? "bg-gradient-to-r from-[var(--brown-900)] to-[var(--brown-800)] text-white shadow-[var(--shadow)]"
                    : "text-[var(--text-secondary)] hover:shadow-[rgba(54,35,27,.08)] hover:translate-x-0.5"
                }
              `}
            >
              {/* signature bookmark tab — only exists on the active item */}
              {active && (
                <span
                  aria-hidden
                  className="absolute -left-2 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-full bg-[var(--gold)] shadow-[0_0_8px_rgba(200,155,60,0.5)]"
                />
              )}
              <Icon
                size={20}
                className={
                  active
                    ? "text-[var(--gold-light)]"
                    : "text-[var(--text-muted)] group-hover:text-[var(--brown-700)]"
                }
              />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ---------- Footer ---------- */}
      <div className="border-t border-[var(--border)] pt-6">
        <span className="h-2 w-2 rounded-full bg-[var(--green)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
          Demo Mode
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Using local mock data
        </p>
      </div>
    </aside>
  );
}
