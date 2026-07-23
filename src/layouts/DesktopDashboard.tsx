import Sidebar from "../components/navigation/Sidebar";

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <main
      className="
        h-screen overflow-hidden
        bg-gradient-to-br from-[var(--bg)] via-[var(--stone-100)] to-[var(--bg)]
      "
    >
      <div className="mx-auto flex h-screen max-w-[1700px]">
        <aside className="w-72 overflow-y-auto border-r border-[var(--border)] bg-[var(--bg)]">
          <Sidebar />
        </aside>

        <section className="flex-1 overflow-auto">
          <div className="mx-auto max-w-[1500px]">{children}</div>
        </section>
      </div>
    </main>
  );
}
