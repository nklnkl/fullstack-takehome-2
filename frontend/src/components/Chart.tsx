import React, {useEffect, useRef} from "react";
import {CandlestickData, createChart} from "lightweight-charts";

// Chart colors based on Figma design. Might move somewhere else later.
const ChartBackgroundColor = "#161514";
const ChartGreenColor = "#4BC2A3";
const ChartRedColor = "#E03737";
const ChartGridLinesColor = "#424242";

interface ChartProps {
  data: CandlestickData[];
  className?: string;
}

const Chart: React.FC<ChartProps> = ({data, className}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle chart resize, might move somewhere else later.
    const handleResize = () => {
      chart?.applyOptions({
        width: chartContainerRef.current?.clientWidth,
      });
    };

    // Chart configuration, appearance, etc.
    const chart = chartContainerRef.current && createChart(chartContainerRef.current, {
      layout: {
        background: {
          color: ChartBackgroundColor,
        },
      },
      grid: {
        vertLines: {
          color: ChartGridLinesColor,
        },
        horzLines: {
          color: ChartGridLinesColor,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart?.timeScale().fitContent();

    // Inject data into chart
    const candlestickSeries = chart?.addCandlestickSeries({
      upColor: ChartGreenColor,
      downColor: ChartRedColor,
    });
    candlestickSeries?.setData(data);

    // Call resize handler on window resize
    window.addEventListener("resize", () => handleResize());

    // Cleanup
    return () => {
      window.removeEventListener("resize", () => handleResize());
      chart?.remove();
    };
  }, [data]);

  return (
    <div className={className} ref={chartContainerRef}/>
  );
};

export default Chart;
