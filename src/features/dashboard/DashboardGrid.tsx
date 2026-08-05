import CurrentReadingCard from "./current-read/CurrentReadCard";
import ProgressCard from "./progress-card/ProgressCard";
import TBRCard from "./tbr/TbrCard";
import QuoteCard from "./quotes/QuoteCard";
import WidgetCard from "./widget/WidgetCard";
import AchievementCard from "./achievements/AchievementCard";
import CollectionsCard from "./collection/CollectionsCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function DashboardGrid() {
  const isXl = useMediaQuery("(min-width: 1280px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  // Desktop — 3-column bento
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

  // Tablet — 2-column with room for TBR / achievements / collections
  if (isMd) {
    return (
      <div
        className="
          grid
          grid-cols-2
          auto-rows-[100px]
          gap-4
        "
      >
        <CurrentReadingCard className="col-start-1 row-start-1 row-span-4" />
        <ProgressCard className="col-start-2 row-start-1 row-span-3" />
        <WidgetCard className="col-start-2 row-start-4 row-span-1" />
        <TBRCard className="col-start-1 row-start-5 row-span-3 col-span-2" />
        <AchievementCard className="col-start-1 row-start-8 row-span-2" />
        <QuoteCard className="col-start-2 row-start-8 row-span-2" />
        <CollectionsCard className="col-start-1 row-start-10 row-span-3 col-span-2" />
      </div>
    );
  }

  // Mobile — stacked layout; full-width cards for TBR, achievements, collections
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      <CurrentReadingCard className="min-h-[300px] sm:min-h-[320px]" />

      <div className="grid grid-cols-2 gap-3">
        <ProgressCard className="min-h-[200px]" />
        <WidgetCard className="min-h-[200px]" />
      </div>

      <TBRCard className="h-[280px] sm:h-[300px] min-h-[280px] sm:min-h-[300px]" />
      <AchievementCard className="h-[260px] sm:h-[280px] min-h-[260px] sm:min-h-[280px]" />
      <QuoteCard className="h-[160px] min-h-[160px]" />
      <CollectionsCard className="h-[220px] sm:h-[240px] min-h-[220px] sm:min-h-[240px]" />
    </div>
  );
}
