"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// import {
//   BarChart,
//   ChartContainer,
//   ChartsXAxis,
//   LineChart,
//   Container,
//   ResponsiveChartContainer,
// } from "@mui/x-charts";

// export default function ChartOne() {
//   return (
//     <Card className="mt-8">
//       <CardHeader>
//         <CardTitle className="text-center">Revenue Trend</CardTitle>
//       </CardHeader>

//       <ResponsiveChartContainer
//         series={[
//           { data: [1, 2, 3], type: "bar" }, // This series is for the bar chart
//           { data: [3, 2, 1], type: "line" }, // This series is for the line chart
//         ]}
//       >
//         <BarChart />
//         <LineChart />
//       </ResponsiveChartContainer>
//     </Card>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";

const dataset = [
  { min: -12, max: -4, precip: 79, month: "Jan" },
  { min: -11, max: -3, precip: 66, month: "Feb" },
  { min: -6, max: 2, precip: 76, month: "Mar" },
  { min: 1, max: 9, precip: 106, month: "Apr" },
  { min: 8, max: 17, precip: 105, month: "Mai" },
  { min: 15, max: 24, precip: 114, month: "Jun" },
  { min: 18, max: 26, precip: 106, month: "Jul" },
  { min: 17, max: 26, precip: 105, month: "Aug" },
  { min: 13, max: 21, precip: 100, month: "Sept" },
  { min: 6, max: 13, precip: 116, month: "Oct" },
  { min: 0, max: 6, precip: 93, month: "Nov" },
  { min: -8, max: -1, precip: 93, month: "Dec" },
];

const series = [
  { type: "line", dataKey: "max", color: "#fe5f55" },
  { type: "bar", dataKey: "precip", color: "#bfdbf7", yAxisId: "rightAxis" },
];

export default function ReverseExampleNoSnap() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-center">Revenue Trend</CardTitle>
      </CardHeader>
      <Stack sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <ResponsiveChartContainer
            series={series}
            xAxis={[
              {
                dataKey: "month",
                label: "Month",
              },
            ]}
            dataset={dataset}
            height={400}
          >
            <ChartsGrid horizontal />
            <BarPlot />
            <LinePlot />
            <MarkPlot />

            <ChartsXAxis />
            <ChartsYAxis axisId="leftAxis" label="temerature (°C)" />

            <ChartsTooltip />
          </ResponsiveChartContainer>
        </Box>
      </Stack>
    </Card>
  );
}