import DashboardHeader from "../features/dashboard/DashboardHeader";
import DashboardGrid from "../features/dashboard/DashboardGrid";
import AppHeader from "../features/dashboard/AppHeader";
import { ChevronUp } from "lucide-react";

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

          bg-[linear-gradient(165deg,var(--brown-100)_0%,var(--surface)_30%,var(--bg-secondary)_65%,var(--brown-200)_100%)]

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
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="
    absolute
    left-1/2
    top-2
    sm:top-3
    -translate-x-1/2

    flex h-6 w-6
    items-center justify-center
  "
        >
          <ChevronUp size={14} />
        </button>
        <DashboardHeader />
        <DashboardGrid />
      </div>
    </>
  );
}
