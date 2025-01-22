import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {KlineData, fetchKlineData } from "../../services/kline";
import {ExchangeInfoResponse, fetchExchangeInfo} from "../../services/exchangeInfo";
import Chart from "../Chart";
import {
  KlineChartClassName,
  ChartClassName,
  FormClassName,
} from "./style";
import {
  convertKlineDataToChartData,
  getIntervalOptions,
  getSymbolOptions,
} from "./util";

interface KlineChartProps {}

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

export default KlineChart;

