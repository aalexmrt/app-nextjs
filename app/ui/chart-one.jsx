import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { BarChart } from "@mui/x-charts/BarChart";

// Placeholder dataset representing a revenue trend
const dataset = [
  {
    month: "Apr",
    revenue: 94.7,
  },
  {
    month: "May",
    revenue: 85.3,
  },
  {
    month: "Jun",
    revenue: 70.2,
  },
  {
    month: "Jul",
    revenue: 60.5,
  },
  {
    month: "Aug",
    revenue: 50.1,
  },
  {
    month: "Sep",
    revenue: 44.5,
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
              stroke: "#00B5E2",
              fill: "#00B5E2",
            },
          ]}
          {...chartSetting}
        />
      </CardContent>
    </Card>
  );
}
