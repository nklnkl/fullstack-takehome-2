import {KlineData} from "./kline";

export const mapKlineData = (kline: Array<any>): KlineData => {
  return {
    openTime: kline[0],
    openPrice: kline[1],
    highPrice: kline[2],
    lowPrice: kline[3],
    closePrice: kline[4],
    closeTime: kline[5],
    v: kline[6],
    quoteV: kline[7],
    numOfTrades: kline[8],
  }
}
