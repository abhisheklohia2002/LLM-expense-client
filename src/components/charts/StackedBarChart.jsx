import React from "react";
import { Chart } from "react-charts";

export function StackedBarChart({ data }) {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.category,
      scaleType: "band",
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.value,
        elementType: "bar",
        stacked: true,
      },
    ],
    []
  );

  return (
    <div className="h-[320px] w-full">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}