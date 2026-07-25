import CurrentReadingCard from "./current-read/CurrentReadCard";
import ProgressCard from "./progress-card/ProgressCard";
import Card from "../../components/ui/Card";
import TBRCard from "./tbr/TbrCard";
import QuoteCard from "./quotes/QuoteCard";
import WidgetCard from "./widget/WidgetCard";
import AchievementCard from "./achievements/AchievementCard";
import CollectionsCard from "./collection/CollectionsCard";

export default function DashboardGrid() {
  return (
    <>
      {/* ---------------- Mobile ---------------- */}
      <div
        className="
    grid
    grid-cols-2
    auto-rows-[90px]
    gap-4

    xl:hidden
  "
      >
        <CurrentReadingCard className="col-start-1 row-start-1 row-span-4" />

        <ProgressCard className="col-start-2 row-start-1 row-span-3" />

        <WidgetCard className="col-start-2 row-start-4 row-span-1" />

        <QuoteCard className="col-start-1 row-start-5 row-span-2" />

        <TBRCard className="col-start-2 row-start-5 row-span-4" />

        <Card className="col-start-1 row-start-7 row-span-2" />
      </div>

      {/* ---------------- Desktop ---------------- */}
      <div
        className="
          hidden
          xl:grid
          xl:grid-cols-3
          xl:auto-rows-[110px]
          xl:gap-6
        "
      >
        <CurrentReadingCard className="col-start-1 row-start-1 row-span-4" />
        <ProgressCard className="col-start-2 row-start-1 row-span-3" />
        <WidgetCard className="col-start-2 row-start-4 row-span-1" />{" "}
        {/* Widget */}
        <AchievementCard className="col-start-2 row-start-5 row-span-2" />
        <QuoteCard className="col-start-3 row-start-1 row-span-3" />{" "}
        {/* quotes */}
        {/* Finished */}
        <TBRCard className="col-start-3 row-start-4 row-span-3" /> {/* TBR */}
        <CollectionsCard className="col-start-1 row-start-5 row-span-2" />
        {/* Continue Reading */}
      </div>
    </>
  );
}
