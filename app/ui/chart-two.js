import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@mui/x-charts/BarChart";

// Placeholder dataset for Active Customers
const dataset = [
  { month: "Apr", activeCustomers: 3626 },
  { month: "May", activeCustomers: 3700 },
  { month: "Jun", activeCustomers: 3780 },
  { month: "Jul", activeCustomers: 3850 },
  { month: "Aug", activeCustomers: 4000 },
  { month: "Sep", activeCustomers: 4118 },
];

const chartSetting = {
  width: 600,
  height: 300,
};

export default function ChartTwo() {
  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle className="text-center">Active Customers</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            {
              dataKey: "activeCustomers",
            },
          ]}
          {...chartSetting}
        />
      </CardContent>
    </Card>
  );
}
