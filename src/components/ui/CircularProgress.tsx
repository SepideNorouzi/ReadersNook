interface CircularProgressProps {
  value: number;
  size?: number;
  mobileSize?: number;
  strokeWidth?: number;
}

export default function CircularProgress({
  value,
  size = 130,
  mobileSize = 96,
  strokeWidth = 10,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const mobileRadius = (mobileSize - strokeWidth) / 2;
  const mobileCircumference = 2 * Math.PI * mobileRadius;
  const mobileOffset =
    mobileCircumference - (value / 100) * mobileCircumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* Mobile */}
      <div className="lg:hidden">
        <svg
          width={mobileSize}
          height={mobileSize}
          className="-rotate-90"
        >
          <circle
            cx={mobileSize / 2}
            cy={mobileSize / 2}
            r={mobileRadius}
            fill="none"
            stroke="var(--stone-200)"
            strokeWidth={strokeWidth}
          />

          <circle
            cx={mobileSize / 2}
            cy={mobileSize / 2}
            r={mobileRadius}
            fill="none"
            stroke="var(--brown-900)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={mobileCircumference}
            strokeDashoffset={mobileOffset}
            className="transition-all duration-700"
          />
        </svg>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--stone-200)"
            strokeWidth={strokeWidth}
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--brown-900)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
      </div>

      <div className="absolute flex flex-col items-center">
        <span
          className="
            text-2xl
            font-bold
            text-[var(--text)]

            lg:text-3xl
          "
        >
          {Math.round(value)}%
        </span>

      </div>
    </div>
  );
}