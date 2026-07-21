import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHeader from "../features/dashboard/DashboardHeader";
import DashboardGrid from "../features/dashboard/DashboardGrid";
import AppHeader from "../features/dashboard/AppHeader";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <AppHeader />

      <div className="px-6 py-6 lg:px-10 lg:py-8">
        <DashboardHeader />

        <DashboardGrid />
      </div>
    </DashboardLayout>
  );
}
