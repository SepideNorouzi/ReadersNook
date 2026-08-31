import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <aside
      className="
        sidebar-dark
        sticky top-0
        flex h-screen flex-col
        bg-gradient-to-b from-[var(--sidebar-bg-start)] to-[var(--sidebar-bg-end)]
        border-r border-[var(--border)]
        shadow-[18px_0_45px_rgba(0,0,0,0.18)]
      "
    >
      <SidebarContent variant="desktop" />
    </aside>
  );
}