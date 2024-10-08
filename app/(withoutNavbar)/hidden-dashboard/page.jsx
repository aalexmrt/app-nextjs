import ChartOne from "@/app/ui/revenue-trend-chart";
import ChartTwo from "@/app/ui/active-customers-chart";
import HeaderDashboard from "@/app/ui/header-dashboard";

export default function Page() {
  return (
    <div className="p-20">
      <HeaderDashboard />
      <div className="mt-8 grid gap-12 sm:grid-cols-1 xl:grid-cols-2">
        <ChartOne />
        <div className="h-[200px]"></div>
        <ChartTwo />
      </div>
    </div>
  );
}
