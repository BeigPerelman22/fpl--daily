import { priceUps } from "../data/mock-price-changes";
import { PriceList } from "./PriceList";

export const UpPriceListDuration = Math.min(priceUps.length * 2, 10);

export const UpPriceList = () => {
  return (
    <PriceList
      title="Price Rises"
      players={priceUps}
      direction="up"
      color="#90ee90"
      startTimeInSeconds={2}
    />
  );
};
