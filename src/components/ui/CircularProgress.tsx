interface CircularProgressProps {
  value: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({
  value,
  size = 130,
  strokeWidth = 10,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#ECE3D8"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2C1810"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold  text-[var(--text)]">
          {Math.round(value)}%
        </span>

        <span className="text-xs text-[var(--text-muted)]">completed</span>
      </div>
    </div>
  );
}
