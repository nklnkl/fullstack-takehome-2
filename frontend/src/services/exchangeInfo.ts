import axios from "axios";

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

export async function fetchExchangeInfo(): Promise<ExchangeInfoResponse> {
  const response = await axios.get(`https://serverprod.vest.exchange/v2/exchangeInfo`);
  return response.data;
}