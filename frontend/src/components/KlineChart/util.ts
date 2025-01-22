import {CandlestickData, Time} from "lightweight-charts";
import {KlineData} from "../../services/kline";
import {ExchangeInfoResponse} from "../../services/exchangeInfo";

export enum KLineInterval {
  "1m",
  "3m",
  "5m",
  "15m",
  "30m",
  "1h",
  "2h",
  "4h",
  "6h",
  "8h",
  "12h",
  "1d",
  "3d",
  "1w",
  "1M",
}

// Convert Vest KlineData Data to TradingView Candlestick Data
export const convertKlineDataToChartData = (data: KlineData): CandlestickData => {
  return {
    time: data.openTime / 1000 as Time,
    open: Number(data.openPrice),
    high: Number(data.highPrice),
    low: Number(data.lowPrice),
    close: Number(data.closePrice)
  }
}

// Convert Vest KlineData Data Array to TradingView Candlestick Data Array
export const convertKlineDataArrayToChartDataArray = (data: KlineData[]): CandlestickData[] => {
  return data ? data.map(item => convertKlineDataToChartData(item)) : [];
}

// Get interval options for the chart dropdown
export const getIntervalOptions = () => {
  return Object.values(KLineInterval)
    .filter(value => typeof value === 'string')
    .map((klineInterval) => ({value: klineInterval.toString(), label: klineInterval.toString()}));
}

// Get symbol options for the chart dropdown from the exchange info
export const getSymbolOptions = (dataExchangeInfo: ExchangeInfoResponse | undefined) => {
  if (!dataExchangeInfo) return [];
  return dataExchangeInfo.symbols.map(item => ({value: item.symbol, label: item.displayName}));
}
