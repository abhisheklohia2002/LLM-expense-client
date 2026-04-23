import { BarChart3 } from "lucide-react";
import { StackedBarChart } from "./StackedBarChart";

export function ChartMessageCard({ message }) {
    console.log(message?.data,'message')
  return (
    <div className="w-full max-w-[85%] rounded-2xl border border-white/10 bg-zinc-900 p-4 text-zinc-100 shadow-sm">
      <StackedBarChart data={message.data} />
    </div>
  );
}