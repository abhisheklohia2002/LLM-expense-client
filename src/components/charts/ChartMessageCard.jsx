import { BarChart3 } from "lucide-react";
import { StackedBarChart } from "./StackedBarChart";

const buildChartDataFromArgs = (args) => {
  const groupBy = args?.groupBy || "month";

  if (groupBy === "month") {
    return [
      {
        label: "Expenses",
        data: [
          { category: "Apr", value: 1200 },
          { category: "May", value: 1800 },
          { category: "Jun", value: 900 },
        ],
      },
    ];
  }

  if (groupBy === "day") {
    return [
      {
        label: "Expenses",
        data: [
          { category: "01 Apr", value: 200 },
          { category: "02 Apr", value: 350 },
          { category: "03 Apr", value: 180 },
        ],
      },
    ];
  }

  return [];
};
export function ChartMessageCard({ message }) {
    console.log(message?.args,'message')
  return (
    <div className="w-full max-w-[85%] rounded-2xl border border-white/10 bg-zinc-900 p-4 text-zinc-100 shadow-sm">
     <StackedBarChart data={buildChartDataFromArgs(message.args)} />
    </div>
  );
}