import DashboardHeader from "../features/dashboard/DashboardHeader";
import DashboardGrid from "../features/dashboard/DashboardGrid";
import AppHeader from "../features/dashboard/AppHeader";

export default function Dashboard() {
  return (
    <>
      <AppHeader />

      <div
        className="
          relative z-10
          -mt-6 lg:-mt-10
          rounded-t-[2rem]
          bg-[var(--bg-secondary)]
          px-6 pt-8 pb-10
          shadow-[var(--shadow)]
          lg:px-10 lg:pt-10
        "
      >
        <DashboardHeader />
        <DashboardGrid />
      </div>
    </>
  );
}