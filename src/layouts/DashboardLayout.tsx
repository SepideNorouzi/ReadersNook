import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <Outlet />
    </main>
  );
}

export default DashboardLayout;
