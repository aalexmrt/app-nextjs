import ChartOne from "../ui/chart-one";
import ChartTwo from "../ui/chart-two";
import HeaderDashboard from "../ui/header-dashboard";

export default function Page() {
  return (
    <>
      <HeaderDashboard />
      <div className="flex mt-8 gap-8 justify-between">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
}
