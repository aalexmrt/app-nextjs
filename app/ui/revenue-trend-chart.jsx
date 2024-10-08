import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getRevenueTrendChart } from "@/services/strapi";

import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  width: 600,
  height: 300,
};

export default async function RevenueTrendChart() {
  const dataChartData = await getRevenueTrendChart();
  const [dataChart] = dataChartData.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-muted-foreground">
          {dataChart.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <BarChart
          dataset={dataChart.dataset}
          xAxis={[{ scaleType: "band", dataKey: dataChart.datasetKey }]}
          series={[
            {
              dataKey: dataChart.seriesKey,
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
