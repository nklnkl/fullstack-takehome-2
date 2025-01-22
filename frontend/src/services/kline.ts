import axios, {AxiosRequestConfig} from 'axios';
import {vestApiRootUrl} from './api';
import {mapKlineData} from './util';

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
  return response.data.map((kline: Array<any>) => mapKlineData(kline));
}

