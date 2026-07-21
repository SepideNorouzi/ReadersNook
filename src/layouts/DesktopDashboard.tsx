import Sidebar from "../components/navigation/Sidebar";

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <aside className="w-72 border-r border-[#E7DED0] bg-[#FAF7F2]">
          <Sidebar />
        </aside>

        <section className="flex-1 overflow-auto">
          <div className="mx-auto max-w-[1500px]">{children}</div>
        </section>
      </div>
    </main>
  );
}
