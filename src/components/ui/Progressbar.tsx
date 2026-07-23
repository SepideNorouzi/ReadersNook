interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="h-2 rounded-full bg-[#EDE8DC] overflow-hidden">
      <div
        className="h-full rounded-full bg-[#2C1810]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
