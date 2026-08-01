import CurrentReadingCard from "./current-read/CurrentReadCard";
import ProgressCard from "./progress-card/ProgressCard";
import TBRCard from "./tbr/TbrCard";
import QuoteCard from "./quotes/QuoteCard";
import WidgetCard from "./widget/WidgetCard";
import AchievementCard from "./achievements/AchievementCard";
import CollectionsCard from "./collection/CollectionsCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function DashboardGrid() {
  // xl breakpoint — only one grid tree mounts (was dual CSS-hidden trees before)
  const isXl = useMediaQuery("(min-width: 1280px)");

  if (isXl) {
    return (
      <div
        className="
          grid
          grid-cols-3
          auto-rows-[110px]
          gap-6
        "
      >
        <CurrentReadingCard className="col-start-1 row-start-1 row-span-4" />
        <ProgressCard className="col-start-2 row-start-1 row-span-3" />
        <WidgetCard className="col-start-2 row-start-4 row-span-1" />
        <AchievementCard className="col-start-2 row-start-5 row-span-2" />
        <TBRCard className="col-start-3 row-start-1 row-span-3" />
        <QuoteCard className="col-start-3 row-start-4 row-span-3" />
        <CollectionsCard className="col-start-1 row-start-5 row-span-2" />
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        auto-rows-[90px]
        gap-4
      "
    >
      <CurrentReadingCard className="col-start-1 row-start-1 row-span-4" />
      <ProgressCard className="col-start-2 row-start-1 row-span-3" />
      <WidgetCard className="col-start-2 row-start-4 row-span-1" />
      <QuoteCard className="col-start-1 row-start-5 row-span-2" />
      <TBRCard className="col-start-2 row-start-5 row-span-4" />
      {/* Mobile previously had an empty Card slot — surface achievements here */}
      <AchievementCard className="col-start-1 row-start-7 row-span-2" />
      <CollectionsCard className="col-start-1 row-start-9 row-span-2 col-span-2" />
    </div>
  );
}
