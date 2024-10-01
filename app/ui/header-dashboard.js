import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";

const placeholderData = [
  {
    id: 1,
    description: "Net Sales",
    amount: "$ 44.5 M",
    versus: "53%",
    versusSign: "negative",
    previousPeriod: "$94.7M",
  },
  {
    id: 2,
    description: "Orders",
    amount: "7,961",
    versus: "52%",
    versusSign: "negative",
    previousPeriod: "16,606",
  },
  {
    id: 3,
    description: "Active Customers",
    amount: "4,118",
    versus: "14%",
    versusSign: "positive",
    previousPeriod: "3,626",
  },
  {
    id: 4,
    description: "Gross Profit Margin",
    amount: "48%",
    versus: "1%",
    versusSign: "positive",
    previousPeriod: "48%",
  },
];
export default function HeaderDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      {placeholderData.map((item) => (
        <Card key={item.id} x-chunk={`dashboard-05-chunk-${item.id}`}>
          <CardHeader className="pb-2">
            <CardDescription className="font-semibold text-center">
              {item.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-4xl text-center">
              {item.amount}
            </CardTitle>

            <Separator className="my-4" />
            <div className="flex h-8 gap-1.5 text-xs justify-center items-center text-muted-foreground">
              <div className="flex flex-col items-center">
                <span
                  className={clsx(
                    "text-base font-semibold",
                    item.versusSign === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {item.versus}
                </span>
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
