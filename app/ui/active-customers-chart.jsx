import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  width: 600,
  height: 300,
};

const CHART_NAME = "Active Customers";
export default async function ActiveCustomersChart() {
  const response = await fetch(
    `http://localhost:1337/api/data-charts?filters[name]=${CHART_NAME}`
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
            },
          ]}
          {...chartSetting}
        />
      </CardContent>
    </Card>
  );
}
