import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {KlineData, fetchKlineData} from "../../services/kline";
import {ExchangeInfoResponse, fetchExchangeInfo} from "../../services/exchangeInfo";
import Chart from "../Chart";
import {
  KlineChartClassName,
  ChartClassName,
  FormWrapperClassName,
} from "./style";
import {
  convertKlineDataToChartData,
  convertKlineDataArrayToChartDataArray,
  getIntervalOptions,
  getSymbolOptions,
  getLatestPrice,
  getFirstHalfSymbol,
} from "./util";
import {useKlineWs} from "../../services/klinews";
import OrderForm from "../OrderForm";

interface KlineChartProps {
}

const KlineChart: React.FC<KlineChartProps> = () => {
  // Keep track of the live status
  const [live, setLive] = useState(false);
  // Keep track of the symbol
  const [symbol, setSymbol] = useState<string>("ETH-PERP");
  // Keep track of the interval
  const [interval, setInterval] = useState<string>("1m");
  // Keep track of the currency
  const [currency, setCurrency] = useState<string>("USDC");
  // Keep track of the live status
  const {active, latestKlineData, connecting} = useKlineWs(symbol, interval, live);
  // Keep track of the current price
  const [currentPrice, setCurrentPrice] = useState<number>(0);

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
  }, [symbol, interval, live]);

  // If live is true, but the websocket is not active, set live to false (probably a connection issue)
  useEffect(() => {
    if (live && !active) {
      setLive(false);
    }
  }, [active]);

  useEffect(() => {
    if (live) {
      setCurrentPrice(getLatestPrice(klineData ?? [], latestKlineData));
    } else {
      setCurrentPrice(getLatestPrice(klineData ?? [], null));
    }
  }, [klineData, latestKlineData]);

  // TODO: make a better loading state and error state
  return <div className={KlineChartClassName}>

    {
      errorKLineData ?
        <div className="flex-1 h-96 pt-10 bg-vest-secondary-background text-white">
          {errorKLineData.message}
        </div> :

        <Chart
          className={ChartClassName}
          data={convertKlineDataArrayToChartDataArray(klineData ?? [])}
          intervalOptions={getIntervalOptions()}
          symbolOptions={getSymbolOptions(dataExchangeInfo)}
          onIntervalChange={setInterval}
          onSymbolChange={setSymbol}
          isLoading={isLoadingKLineData || isRefetchingKLineData}
          latestCandlestickData={latestKlineData ? convertKlineDataToChartData(latestKlineData) : null}
          live={live}
          toggleLive={setLive}
          liveButtonDisabled={connecting}
        />
    }

    <div className={FormWrapperClassName}>
      <OrderForm currentPrice={currentPrice} currency={getFirstHalfSymbol(symbol)} />
    </div>

  </div>
};

export default KlineChart;

