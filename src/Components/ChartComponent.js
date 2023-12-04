// ChartComponent.js
import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
} from "chart.js/auto";

const ChartComponent = ({ chartData, type, options }) => {
  const chartRef = useRef();
  //   let [myChart, setMyChart] = useState(null);
  const myChart = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    Chart.register(BarController, CategoryScale, LinearScale);

    if (myChart.current) {
      myChart.current.destroy();
    }
    myChart.current = new Chart(ctx, {
      type: type, // You can change the type of chart (bar, line, pie, etc.)
      data: chartData,
      options: options,
    });
    // setMyChart(myChart);
  }, [chartData, type, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
