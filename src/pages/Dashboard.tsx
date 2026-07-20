import DashboardGrid from "../features/dashboard/DashboardGrid";
import DashboardHeader from "../features/dashboard/DashboardHeader";

function Dashboard() {
  return (
    <div className="px-6 py-8 lg:px-12 lg:py-10">
      <DashboardHeader />

      <DashboardGrid />
    </div>
  );
}

export default Dashboard;
