import axios, {AxiosRequestConfig} from 'axios';
import { vestApiRootUrl } from './api';

const API_URL = 'http://localhost:3001';

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

export const fetchKlineData = async (symbol: string, interval?: string): Promise<KlineData[]> => {
  const requestConfig: AxiosRequestConfig = {
    params: {}
  };
  if (symbol) {
    requestConfig.params["symbol"] = symbol;
  }
  if (interval) {
    requestConfig.params["interval"] = interval.toString();
  }
  const response = await axios.get(`${vestApiRootUrl}/klines`, requestConfig);
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