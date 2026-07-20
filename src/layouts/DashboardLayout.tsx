import { Outlet } from "react-router";
import Sidebar from "../components/navigation/Sidebar";
import MobileNavbar from "../components/navigation/MobileNavbar";
import Hero from "../features/dashboard/Hero";

function DashboardLayout() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 border-r border-[#E7DED0] bg-[#FAF7F2]">
          <Sidebar />
        </aside>

        {/* Main */}
        <section className="flex-1">
          {/* Mobile Navigation */}
          <div className="relative">
            <div className="lg:hidden">
              <MobileNavbar />
            </div>

            <Hero />
          </div>
          
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default DashboardLayout;
