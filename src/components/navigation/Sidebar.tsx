import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <aside
      className="
        sticky top-0
        flex h-screen flex-col
        bg-[var(--surface)]
        border-r border-[var(--border)]
        shadow-[18px_0_40px_rgba(54,35,27,0.06)]
      "
    >
      <SidebarContent variant="desktop" />
    </aside>
  );
}