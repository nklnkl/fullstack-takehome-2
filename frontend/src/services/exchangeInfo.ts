import axios from "axios";
import { vestApiRootUrl } from './api';
export interface ExchangeInfoResponse {
  exchange: ExchangeInfo;
  symbols: SymbolInfo[];
}

export interface ExchangeInfo {
  lp: string;
  insurance: string;
  collateralDecimals: number;
}

export interface SymbolInfo {
  symbol: string;
  displayName: string;
  base: string;
  quote: string;
  sizeDecimals: number;
  priceDecimals: number;
  initMarginRatio: string;
  maintMarginRatio: string;
  takerFee: string;
}

export const fetchExchangeInfo = async (): Promise<ExchangeInfoResponse> => {
  const response = await axios.get(`${vestApiRootUrl}/exchangeInfo`);
  return response.data;
}