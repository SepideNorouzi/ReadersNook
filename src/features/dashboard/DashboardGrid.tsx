import Card from "../../components/ui/Card";

export default function DashboardGrid() {
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col gap-4 xl:hidden">

        <Card className="h-[380px]" />

        <Card className="h-[220px]" />

        <Card className="h-[90px]" />

        <Card className="h-[250px]" />

        <Card className="h-[250px]" />

        <Card className="h-[250px]" />

      </div>

      {/* Desktop */}
      <div className="hidden xl:grid xl:grid-cols-3 xl:gap-6">

        <div className="flex flex-col gap-6">
          <Card className="h-[420px]" />
          <Card className="h-[280px]" />
        </div>

        <div className="flex flex-col gap-6">
          <Card className="h-[260px]" />
          <Card className="h-[120px]" />
          <Card className="h-[280px]" />
        </div>

        <div className="flex flex-col gap-6">
          <Card className="h-[420px]" />
          <Card className="h-[260px]" />
        </div>

      </div>
    </>
  );
}
