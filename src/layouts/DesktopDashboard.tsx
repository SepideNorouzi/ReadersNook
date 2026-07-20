import Sidebar from "../components/navigation/Sidebar";
import DashboardGrid from "../features/dashboard/DashboardGrid";
import DashboardHeader from "../features/dashboard/DashboardHeader";
import Hero from "../features/dashboard/Hero";

export default function DesktopDashboard() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <aside className="w-72 border-r border-[#E7DED0] bg-[#FAF7F2]">
          <Sidebar />
        </aside>

        <section className="flex-1">
          <Hero />

          <div className="px-10 py-8">
            <DashboardHeader />

            <DashboardGrid />
          </div>
        </section>
      </div>
    </main>
  );
}
