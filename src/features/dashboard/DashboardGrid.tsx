import Card from "../../components/ui/Card";

export default function DashboardGrid() {
  return (
    <div
      className="
      grid
      gap-6

      md:grid-cols-2

      xl:grid-cols-3
      "
    >
      <Card className="h-[420px]" />
      <Card className="h-[260px]" />
      <Card className="h-[260px]" />

      <Card className="h-[260px]" />
      <Card className="h-[260px]" />

      <Card className="h-[420px] md:col-span-2 xl:col-span-1" />
    </div>
  );
}
