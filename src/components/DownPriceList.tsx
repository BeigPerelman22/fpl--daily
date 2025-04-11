import { priceDowns } from "../data/mock-price-changes";
import { priceUps } from "../data/mock-price-changes";
import { PriceList } from "./PriceList";

export const DownPriceListDuration = Math.min(priceDowns.length * 2, 10);
const UpPriceListDuration = Math.min(priceUps.length * 2, 10);

export const DownPriceList = () => {
  const startTime = 2 + UpPriceListDuration;

  return (
    <PriceList
      title="Price Fallers"
      players={priceDowns}
      direction="down"
      color="#ff7f7f"
      startTimeInSeconds={startTime}
    />
  );
};
