import CurrentReadingCard from "./current-read/CurrentReadCard";
import ProgressCard from "./progress-card/ProgressCard";
import TBRCard from "./tbr/TbrCard";
import QuoteCard from "./quotes/QuoteCard";
import AchievementCard from "./achievements/AchievementCard";
import CollectionsCard from "./collection/CollectionsCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function DashboardGrid() {
  const isXl = useMediaQuery("(min-width: 1280px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  // Desktop
  if (isXl) {
    return (
      <div className="grid grid-cols-3 auto-rows-[110px] gap-6">
        {/* Column 1 */}
        <CurrentReadingCard className="col-start-1 row-start-1 row-span-4" />

        {/* Column 2 */}
        <ProgressCard className="col-start-2 row-start-1 row-span-3" />
        <CollectionsCard className="col-start-2 row-start-4 row-span-3" />

        {/* Column 3 */}
        <TBRCard className="col-start-3 row-start-1 row-span-3" />
        <QuoteCard className="col-start-3 row-start-4 row-span-3" />

        {/* Bottom-left */}
        <AchievementCard className="col-start-1 row-start-5 row-span-2" />
      </div>
    );
  }

  // Tablet
  if (isMd) {
    return (
      <div className="grid grid-cols-2 auto-rows-[100px] gap-4">
        <CurrentReadingCard className="col-start-1 row-start-1 row-span-4" />

        <ProgressCard className="col-start-2 row-start-1 row-span-3" />

        <TBRCard className="col-span-2 row-start-5 row-span-3" />

        <CollectionsCard className="col-span-2 row-start-8 row-span-3" />

        <AchievementCard className="col-start-1 row-start-11 row-span-2" />

        <QuoteCard className="col-start-2 row-start-11 row-span-2" />
      </div>
    );
  }

  // Mobile
  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      <CurrentReadingCard />

      <ProgressCard  />

      <TBRCard/>

      <CollectionsCard  />

      <AchievementCard />

      <QuoteCard />
    </div>
  );
}
