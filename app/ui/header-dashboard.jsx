import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { ArrowDownRightIcon, ArrowUpLeftIcon } from "@heroicons/react/24/solid";

export default async function HeaderDashboard() {
  const data = await fetch("http://localhost:1337/api/key-metrics");
  const keyMetricsData = await data.json();
  const keyMetrics = keyMetricsData.data;

  return (
    <div className="grid gap-12 mt-12 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-4">
      {keyMetrics &&
        keyMetrics.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardDescription className="font-semibold text-lg text-center">
                {item.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-4xl text-center">
                {item.amount}
              </CardTitle>

              <Separator className="my-4" />
              <div className="flex h-8 gap-1.5 text-xs justify-center items-center text-muted-foreground">
                <div className="flex flex-col items-center">
                  <div className="flex gap-2 align-baseline">
                    {item.growthIndicator === "positive" ? (
                      <ArrowUpLeftIcon className="h-100 w-4 text-gray text-green-500" />
                    ) : (
                      <ArrowDownRightIcon className="h-100 w-4 text-gray text-red-500" />
                    )}

                    <span
                      className={clsx(
                        "text-base font-semibold",
                        item.growthIndicator === "positive"
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {item.versus}
                    </span>
                  </div>
                  <p>Versus</p>
                </div>
                <Separator orientation="vertical" className="h-full mx-4" />
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold">
                    {item.previousPeriod}
                  </span>
                  <span>Previous</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
