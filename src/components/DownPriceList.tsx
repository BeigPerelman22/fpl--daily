import { PriceList } from "./PriceList";
import { UpPriceListDuration } from "./UpPriceList";
import {
  chunkPlayers,
  ChunksDuration,
  PlayerGroupDuration,
} from "../lib/utils";
import {
  BASE_START_TIME_SECONDS,
  PLAYERS_PER_CHUNK,
  SECONDS_PER_PLAYER,
} from "../lib/VideoConstants";
import priceChange from "../../public/assets/price-changes.json";
import { PriceChange } from "../models/price-changes";

const priceChanges: PriceChange = priceChange;

const chunks = chunkPlayers(priceChanges.priceDowns, PLAYERS_PER_CHUNK);

export const DownPriceListDuration = Math.min(
  priceChanges.priceDowns.length * SECONDS_PER_PLAYER,
  ChunksDuration(chunks),
);

export const DownPriceList = () => {
  return (
    <>
      {chunks.map((players, index) => {
        const groupDuration = PlayerGroupDuration(chunks, index);
        const startTime =
          BASE_START_TIME_SECONDS + UpPriceListDuration + index * groupDuration;

        return (
          <PriceList
            key={index}
            title="Price Fallers"
            players={players}
            direction="down"
            color="white"
            startTimeInSeconds={startTime}
            arrowSvg="/assets/images/red-arrow.svg"
          />
        );
      })}
    </>
  );
};
