import { BookOpen } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { navItems } from "./NavItem";

interface SidebarContentProps {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function SidebarContent({
  variant = "desktop",
  onNavigate,
}: SidebarContentProps) {
  const location = useLocation();
  const currentPage =
    navItems.find((item) => item.path === location.pathname) ?? navItems[0];

  const isMobile = variant === "mobile";

  return (
    <div
      className={`flex h-full flex-col ${
        isMobile ? "px-6 py-8" : "px-8 py-10"
      }`}
    >
      {/* ---------- Logo ---------- */}
      <div className="flex items-center gap-3">
        <div
          className={`
  flex items-center justify-center
  rounded-2xl
  bg-gradient-to-br
  ${
    isMobile
      ? "from-[var(--brown-900)] via-[var(--brown-700)] to-[var(--brown-500)]"
      : "from-[var(--sidebar-accent-start)] to-[var(--sidebar-accent-end)]"
  }
  text-white
  shadow-[0_12px_30px_rgba(54,35,27,.28),inset_0_1px_1px_rgba(255,255,255,.18)]
  ${isMobile ? "h-10 w-10" : "h-12 w-12"}
`}
        >
          <BookOpen size={isMobile ? 18 : 22} />
        </div>
        <div>
          <h1
            className={`font-heading font-bold text-[var(--text)] ${
              isMobile ? "text-base" : "text-lg"
            }`}
          >
            Reader's Nook
          </h1>
          <p
            className={`text-[var(--text-secondary)] ${
              isMobile ? "text-xs" : "text-sm"
            }`}
          >
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav
        className={`flex flex-1 flex-col gap-1.5 ${
          isMobile ? "mt-8" : "mt-14"
        }`}
      >
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              onClick={onNavigate}
              className={`
  group relative flex items-center gap-4 rounded-2xl
  transition-all duration-200 ease-out
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2
  focus-visible:ring-offset-[var(--bg)]
  ${isMobile ? "px-3 py-2.5" : "px-4 py-3"}
  ${
    active
      ? isMobile
        ? "bg-gradient-to-r from-[var(--brown-900)] to-[var(--brown-800)] text-white shadow-[var(--shadow)]"
        : "bg-white/[0.06] text-[var(--sidebar-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      : "text-[var(--text-secondary)] hover:translate-x-0.5"
  }
`}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute -left-2 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-full bg-[var(--gold)] shadow-[0_0_8px_rgba(200,155,60,0.5)]"
                />
              )}
              <Icon
                size={isMobile ? 18 : 20}
                className={
                  active
                    ? "text-[var(--gold-light)]"
                    : "text-[var(--text-muted)] group-hover:text-[var(--brown-700)]"
                }
              />
              <span
                className={`font-medium ${isMobile ? "text-[13px]" : "text-sm"}`}
              >
                {label}
              </span>
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
    </div>
  );
}
