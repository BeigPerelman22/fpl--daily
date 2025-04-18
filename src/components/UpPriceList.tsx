import { PriceList } from "./PriceList";
import { chunkPlayers, ChunksDuration, PlayerGroupDuration } from "../lib/utils";
import { BASE_START_TIME_SECONDS, PLAYERS_PER_CHUNK, SECONDS_PER_PLAYER } from "../lib/VideoConstants";
import { PriceChange } from "../models/price-changes";
import priceChange from "../../public/assets/price-changes.json";

const priceChanges: PriceChange = priceChange;

const chunks = chunkPlayers(priceChanges.priceUps, PLAYERS_PER_CHUNK); // groups of max 5

export const UpPriceListDuration = Math.min(
  priceChanges.priceUps.length * SECONDS_PER_PLAYER,
  ChunksDuration(chunks),
);

export const UpPriceList = () => {
  return (
    <>
      {chunks.map((group, index) => {
        const groupDuration = PlayerGroupDuration(chunks, index);
        const startTime = BASE_START_TIME_SECONDS + index * groupDuration;

        return (
          <PriceList
            key={index}
            title="Price Rises"
            players={group}
            direction="up"
            color="white"
            startTimeInSeconds={startTime}
            arrowSvg="/assets/images/green-arrow.svg"
          />
        );
      })}
    </>
  );
};
