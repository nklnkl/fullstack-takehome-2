import React, {useEffect, useState} from "react";
import {CandlestickData, Time} from "lightweight-charts";
import {useQuery} from "@tanstack/react-query";
import {KlineData, fetchKlineData, KLineInterval} from "../services/kline";
import Chart from "./Chart";
import {ExchangeInfoResponse, fetchExchangeInfo} from "../services/exchangeInfo";

interface KlineChartProps {
}

const KlineChart: React.FC<KlineChartProps> = () => {
  const [symbol, setSymbol] = useState<string>("ETH-PERP");
  const [interval, setInterval] = useState<string>("1m");

  // REST - Kline Data
  const {
    isLoading: isLoadingKLineData,
    isRefetching: isRefetchingKLineData,
    error: errorKLineData,
    data: klineData,
    refetch: refetchKlineData
  } = useQuery<KlineData[]>({
    queryKey: ["kline"],
    queryFn: () => fetchKlineData(symbol, interval)
  });

  // REST - Exchange Info -> Symbols[]
  const {
    data: dataExchangeInfo
  } = useQuery<ExchangeInfoResponse>({
    queryKey: ["exchangeInfo"],
    queryFn: () => fetchExchangeInfo()
  });

  // Refetch Kline Data when symbol or interval changes
  useEffect(() => {
    refetchKlineData();
  }, [symbol, interval]);

  // TODO: make a better loading state and error state
  return <div className={KlineChartClassName}>

    {
      errorKLineData ?
        <div className="flex-1 h-96 pt-10 bg-vest-secondary-background text-white">
          {errorKLineData.message}
        </div> :

        <Chart
          className={ChartClassName}
          data={convertKlineDataToChartData(klineData ?? [])}
          intervalOptions={getIntervalOptions()}
          symbolOptions={getSymbolOptions(dataExchangeInfo)}
          onIntervalChange={setInterval}
          onSymbolChange={setSymbol}
          isLoading={isLoadingKLineData || isRefetchingKLineData}
        />
    }

    <div className={FormClassName}>
      form placeholder
    </div>

  </div>
};

const KlineChartClassName = "flex flex-row";
const ChartClassName = "flex-1";
const FormClassName = "flex-none w-80";

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

// Get interval options for the chart dropdown
function getIntervalOptions() {
  return Object.values(KLineInterval)
    .filter(value => typeof value === 'string')
    .map((klineInterval) => ({value: klineInterval.toString(), label: klineInterval.toString()}));
}

function getSymbolOptions(dataExchangeInfo: ExchangeInfoResponse | undefined): { value: string, label: string }[] {
  if (!dataExchangeInfo) return [];
  return dataExchangeInfo.symbols.map(item => ({value: item.symbol, label: item.displayName}));
}

export default KlineChart;

