import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActiveCustomersChart } from "@/services/strapi";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  width: 600,
  height: 300,
};

export default async function ActiveCustomersChart() {
  const dataChartData = await getActiveCustomersChart();
  const [dataChart] = dataChartData.data || [{}];

  return (
    <>
      {Object.keys(dataChart).length > 0 ? (
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
      ) : (
        <div className="flex justify-center">
          <div className="text-center text-muted-foreground">
            No data available
          </div>
        </div>
      )}
    </>
  );
}
