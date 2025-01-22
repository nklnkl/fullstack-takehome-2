import React, {useEffect, useRef} from "react";
import {CandlestickData, createChart} from "lightweight-charts";
import {ClipLoader} from "react-spinners";
import ChartDropdown from "../ChartDropdown";
import {
  ChartBackgroundColor,
  ChartGridLinesColor,
  ChartGreenColor,
  ChartRedColor,
  ChartContainerClassName,
  ChartMenuClassName,
  ChartClassName,
  ChartLoadingClassName
} from "./style";

interface ChartProps {
  data: CandlestickData[];
  className?: string;
  intervalOptions: { value: string, label: string }[];
  symbolOptions: { value: string, label: string }[];
  onIntervalChange: (interval: string) => void;
  onSymbolChange: (symbol: string) => void;
  isLoading?: boolean;
}

const Chart: React.FC<ChartProps> = ({
  data,
  className,
  intervalOptions,
  symbolOptions,
  onIntervalChange,
  onSymbolChange,
  isLoading
}) => {
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
        textColor: "white",
      },
      grid: {
        vertLines: {
          color: ChartGridLinesColor,
        },
        horzLines: {
          color: ChartGridLinesColor,
        },
      },
      height: chartContainerRef.current?.clientHeight,
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
    <div className={ChartContainerClassName}>
      <div className={ChartMenuClassName}>
        <ChartDropdown
          options={symbolOptions}
          onChange={onSymbolChange}
          placeholder="ETH-PERP"
        />
        <ChartDropdown
          options={intervalOptions}
          onChange={onIntervalChange}
          placeholder="1m"
        />
      </div>
      {isLoading ? <div className={ChartLoadingClassName}>
        <ClipLoader color="#FFFFFF" size={50}/>
      </div> : <div className={`${ChartClassName} ${className}`} ref={chartContainerRef}/>}
    </div>
  );
};

export default Chart;
