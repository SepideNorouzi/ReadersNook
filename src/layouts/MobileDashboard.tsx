import MobileNavbar from "../components/navigation/MobileNavbar";
import DashboardGrid from "../features/dashboard/DashboardGrid";
import DashboardHeader from "../features/dashboard/DashboardHeader";
import Hero from "../features/dashboard/Hero";

export default function MobileDashboard() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <div className="relative">
        <MobileNavbar />

        <Hero />
      </div>

      <section className="px-6 py-6">
        <DashboardHeader />

        <DashboardGrid />
      </section>
    </main>
  );
}
