import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { BarChart } from "@mui/x-charts/BarChart";

// Placeholder dataset representing a revenue trend
const dataset = [
  {
    month: "Apr",
    revenue: 94.7,
    activeCustomers: 3626,
    orders: 16606,
    profitMargin: 48,
  },
  {
    month: "May",
    revenue: 85.3,
    activeCustomers: 3700,
    orders: 15000,
    profitMargin: 47,
  },
  {
    month: "Jun",
    revenue: 70.2,
    activeCustomers: 3780,
    orders: 14000,
    profitMargin: 47.5,
  },
  {
    month: "Jul",
    revenue: 60.5,
    activeCustomers: 3850,
    orders: 12000,
    profitMargin: 48,
  },
  {
    month: "Aug",
    revenue: 50.1,
    activeCustomers: 4000,
    orders: 10000,
    profitMargin: 48.5,
  },
  {
    month: "Sep",
    revenue: 44.5,
    activeCustomers: 4118,
    orders: 7961,
    profitMargin: 48,
  },
];

const chartSetting = {
  width: 600,
  height: 300,
};

export default function ChartOne() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-muted-foreground">
          Revenue Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            {
              dataKey: "revenue",
            },
          ]}
          {...chartSetting}
        />
      </CardContent>
    </Card>
  );
}
