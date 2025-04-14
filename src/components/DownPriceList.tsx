import { PriceList } from "./PriceList";
import { UpPriceListDuration } from "./UpPriceList";
import { chunkPlayers } from "../lib/utils";
import { BASE_START_TIME_SECONDS, PLAYERS_PER_CHUNK, SECONDS_PER_PLAYER } from "../lib/VideoConstants";
import priceChange from "../../public/assets/price-changes.json";
import { PriceChange } from "../models/price-changes";

const priceChanges: PriceChange = priceChange;

const chunks = chunkPlayers(priceChanges.priceDowns, PLAYERS_PER_CHUNK);

export const DownPriceListDuration = Math.min(
  priceChanges.priceDowns.length * SECONDS_PER_PLAYER,
  PLAYERS_PER_CHUNK * chunks.length
);

export const DownPriceList = () => {
  return (
    <>
      {chunks.map((group, index) => {
        const groupDuration = Math.min(group.length * SECONDS_PER_PLAYER, PLAYERS_PER_CHUNK);
        const startTime = BASE_START_TIME_SECONDS + UpPriceListDuration + index * groupDuration;

        return (
          <PriceList
            key={index}
            title="Price Fallers"
            players={group}
            direction="down"
            color="#ff7f7f"
            startTimeInSeconds={startTime}
          />
        );
      })}
    </>
  );
};
