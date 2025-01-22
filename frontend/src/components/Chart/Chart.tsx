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
  ChartLoadingClassName,
  ChartWrapperClassName,
  ChartButtonClassName
} from "./style";

interface ChartProps {
  data: CandlestickData[];
  className?: string;
  intervalOptions: { value: string, label: string }[];
  symbolOptions: { value: string, label: string }[];
  onIntervalChange: (interval: string) => void;
  onSymbolChange: (symbol: string) => void;
  isLoading?: boolean;
  latestCandlestickData?: CandlestickData | null;
  live: boolean;
  toggleLive: (live: boolean) => void;
  liveButtonDisabled: boolean;
}

const Chart: React.FC<ChartProps> = ({
  data,
  className,
  intervalOptions,
  symbolOptions,
  onIntervalChange,
  onSymbolChange,
  isLoading,
  latestCandlestickData,
  live,
  toggleLive,
  liveButtonDisabled,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  let candlestickSeries: any | null = null;
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

    // Inject data into chart
    candlestickSeries = chart?.addCandlestickSeries({
      upColor: ChartGreenColor,
      downColor: ChartRedColor,
    });
    candlestickSeries?.setData(data);

    chart?.timeScale().fitContent();

    // Call resize handler on window resize
    window.addEventListener("resize", () => handleResize());

    // Cleanup
    return () => {
      window.removeEventListener("resize", () => handleResize());
      chart?.remove();
    };
  }, [data]);

  useEffect(() => {
    if (latestCandlestickData) {
      candlestickSeries?.update(latestCandlestickData);
    }
  }, [latestCandlestickData]);

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
        <button disabled={liveButtonDisabled} className={ChartButtonClassName(live)} onClick={() => toggleLive(!live)}>
          {live ? "Stop" : "Start"}
        </button>
      </div>
      <div className={ChartWrapperClassName}>
        <div className={`${ChartClassName} ${className}`} ref={chartContainerRef}/>
        {isLoading && (
          <div className={ChartLoadingClassName}>
            <ClipLoader color="#FFFFFF" size={50}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
