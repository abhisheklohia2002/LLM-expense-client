const ToChartSeries = (result) => {
  const raw = result?.chartData || [];

  return [
    {
      label: "Expenses",
      data: raw.map((item) => ({
        category: item.label,
        value: item.totalAmount,
      })),
    },
  ];
};


export default ToChartSeries