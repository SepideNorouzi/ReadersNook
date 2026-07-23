import CurrentReadingCard from "./current-read/CurrentReadCard";
import ProgressCard from "./progress-card/ProgressCard";
import Card from "../../components/ui/Card";

export default function DashboardGrid() {
  return (
    <>
      {/* ---------------- Mobile ---------------- */}
      <div className="flex flex-col gap-4 xl:hidden">
        <CurrentReadingCard />

        <ProgressCard />

        <Card className="h-[120px]" />

        <Card className="h-[250px]" />

        <Card className="h-[250px]" />

        <Card className="h-[250px]" />
      </div>

      {/* ---------------- Desktop ---------------- */}
      <div
        className="
          hidden
          xl:grid
          xl:grid-cols-3
          xl:auto-rows-[100px]
          xl:gap-6
        "
      >
        <CurrentReadingCard className="col-start-1 row-start-1 row-span-4" />
        <ProgressCard className="col-start-2 row-start-1 row-span-3" />
        <Card className="col-start-2 row-start-4 row-span-1" /> {/* Widget */}
        <Card className="col-start-2 row-start-5 row-span-2" /> {/* quotes */}
        <Card className="col-start-3 row-start-1 row-span-2" /> {/* Finished */}
        <Card className="col-start-3 row-start-3 row-span-4" /> {/* TBR */}
        <Card className="col-start-1 row-start-5 row-span-2" />
        {/* Continue Reading */}
      </div>
    </>
  );
}
