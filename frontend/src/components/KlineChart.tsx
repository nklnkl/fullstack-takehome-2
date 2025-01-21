import React from "react";
import {CandlestickData, Time} from "lightweight-charts";
import {useQuery} from "@tanstack/react-query";
import {KlineData, fetchKlineData} from "../services/api";
import Chart from "./Chart";

interface KlineChartProps {
  symbol1: string;
  symbol2: string;
}

const KlineChart: React.FC<KlineChartProps> = ({symbol1, symbol2}) => {

  // REST
  const {isLoading, error, data} = useQuery<KlineData[]>({
    queryKey: ["kline"],
    queryFn: () => fetchKlineData(symbol1, symbol2)
  });

  // TODO: make a better loading state and error state
  return isLoading ? <div>Loading...</div> :
    error ? <div>Error: {error.message}</div> :
    <div>
      <Chart data={convertKlineDataToChartData(data ?? [])}/>;
    </div>
};

// Convert Vest KlineData Data to TradingView Candlestick Data
function convertKlineDataToChartData(data: KlineData[]): CandlestickData[] {
  return data ? data.map(item => ({
    time: item.openTime / 1000 as Time,
    open: Number(item.openPrice),
    high: Number(item.highPrice),
    low: Number(item.lowPrice),
    close: Number(item.closePrice)
  })) : [];
}

export default KlineChart;

