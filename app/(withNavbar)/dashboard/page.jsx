import ChartOne from "../../ui/chart-one";
import ChartTwo from "../../ui/chart-two";
import HeaderDashboard from "../../ui/header-dashboard";

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
