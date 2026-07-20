import { Outlet } from "react-router";
import Sidebar from "../components/navigation/Sidebar";
import MobileNavbar from "../components/navigation/MobileNavbar";

export default function DashboardLayout() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <MobileNavbar />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 border-r border-[#E7DED0] bg-[#FAF7F2]">
          <Sidebar />
        </aside>

        {/* Pages */}
        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </main>
  );
}