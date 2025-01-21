import axios, {AxiosRequestConfig} from 'axios';

const API_URL = 'http://localhost:3001';

enum KLineInterval {
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

export interface KlineData {
  openTime: number;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  closePrice: string;
  closeTime: number;
  v: string;
  quoteV: string;
  numOfTrades: number;
}

export async function fetchKlineData(symbol1?: string, symbol2?: string, interval?: KLineInterval): Promise<KlineData[]> {
  const requestConfig: AxiosRequestConfig = {
    params: {}
  };
  if (symbol1 && symbol2) {
    requestConfig.params["symbol"] = `${symbol1}-${symbol2}`;
  }
  if (interval) {
    requestConfig.params["interval"] = interval.toString();
  }
  const response = await axios.get(`https://serverprod.vest.exchange/v2/klines`, requestConfig);
  return response.data.map((kline: Array<any>) => ({
    openTime: kline[0],
    openPrice: kline[1],
    highPrice: kline[2],
    lowPrice: kline[3],
    closePrice: kline[4],
    closeTime: kline[5],
    v: kline[6],
    quoteV: kline[7],
    numOfTrades: kline[8],
  }));
}
