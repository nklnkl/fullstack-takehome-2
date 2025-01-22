import {useEffect, useState} from "react";
import {vestApiWsRootUrl} from "./api";
import {KlineData} from "./kline";
import {mapKlineData} from "./util";

export const useKlineWs = (symbol: string, interval: string, start: boolean) => {
  // Keep track of the subscription id
  const subscriptionId = Date.now();
  // Keep track of the connection status
  const [active, setActive] = useState(false);
  // Keep track of "connecting" status
  const [connecting, setConnecting] = useState(false);
  // Track latest kline data
  const [latestKlineData, setLatestKlineData] = useState<KlineData | null>(null);

  useEffect(() => {
    if (!start) {
      return;
    }

    setConnecting(true);

    // Create the websocket connection
    const ws = new WebSocket(vestApiWsRootUrl);

    // Create the subscribe message
    const subscribeMessage = JSON.stringify({
      method: "SUBSCRIBE",
      params: [`${symbol}@kline_${interval}`],
      id: subscriptionId,
    });

    ws.onopen = () => {
      console.info("WebSocket connected");
      setConnecting(false);
      // Send subscribe message to start receiving kline data
      ws.send(subscribeMessage);
    };

    ws.onmessage = async (event) => {
      const message = await onSocketMessage(event)
      if (message.data && message.data.length > 0) {
        setLatestKlineData(mapKlineData(message.data));
        setActive(true)
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error", error);
      setActive(false);
    };

    ws.onclose = () => {
      console.info("WebSocket closed");
      setActive(false);
    };

    // Cleanup the websocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, [symbol, interval, start]);

  return {active, latestKlineData, connecting};
};

const onSocketMessage = async (event: MessageEvent) => {
  // Parse the message
  const arrayBuffer = await event.data.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const text = new TextDecoder().decode(uint8Array);
  const parsedData = JSON.parse(text);
  return parsedData;
}
