import Card from "../../ui/Card";

export default function QuotesGrid() {
  return (
    <div className="space-y-4">
      <div className="mb-7 space-y-2">
        <div className="h-3 w-24 animate-pulse rounded bg-[var(--bg-secondary)]" />
        <div className="h-8 w-48 animate-pulse rounded-lg bg-[var(--bg-secondary)]" />
        <div className="h-4 w-64 animate-pulse rounded bg-[var(--bg-secondary)]" />
      </div>

      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          className="
            animate-pulse
            rounded-[20px]
            border border-[var(--brown-200)]
            px-5 py-6
          "
        >
          <div className="flex gap-4">
            <div className="h-14 w-1 rounded-full bg-[var(--bg-secondary)]" />

            <div className="flex-1 space-y-3">
              <div className="h-5 w-full rounded bg-[var(--bg-secondary)]" />
              <div className="h-5 w-10/12 rounded bg-[var(--bg-secondary)]" />
              <div className="mt-4 h-3 w-40 rounded bg-[var(--bg-secondary)]" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
