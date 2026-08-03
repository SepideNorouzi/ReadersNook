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
          -mt-8
          sm:-mt-10

          rounded-t-[1.75rem]
          sm:rounded-t-[2.5rem]

          bg-gradient-to-b from-[var(--surface)] to-[var(--bg-secondary)]

          px-4
          pt-6
          pb-24

          sm:px-6
          sm:pt-8
          sm:pb-12

          lg:px-10
          lg:pt-10
          lg:pb-10

          shadow-[var(--shadow-lg)]
        "
      >
        <DashboardHeader />
        <DashboardGrid />
      </div>
    </>
  );
}
