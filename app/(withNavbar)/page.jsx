import ChartOne from "../ui/revenue-trend-chart";
import ChartTwo from "../ui/active-customers-chart";
import HeaderDashboard from "../ui/header-dashboard";

export default function Page() {
  return (
    <>
      <HeaderDashboard />
      <div className="mt-12 grid gap-12 sm:grid-cols-1 xl:grid-cols-2">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
}
