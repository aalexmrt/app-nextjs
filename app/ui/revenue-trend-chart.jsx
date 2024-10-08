import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  width: 600,
  height: 300,
};

const CHART_NAME = "Revenue Trend";
export default async function RevenueTrendChart() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/data-charts?filters[name]=${CHART_NAME}`
  );
  const dataChartData = await response.json();
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
