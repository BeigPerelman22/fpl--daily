import { PriceList } from "./PriceList";
import { chunkPlayers, ChunksDuration, PlayerGroupDuration } from "../lib/utils";
import { BASE_START_TIME_SECONDS, PLAYERS_PER_CHUNK, SECONDS_PER_PLAYER } from "../lib/VideoConstants";
import { PriceChange } from "../models/price-changes";
import priceChange from "../../public/assets/price-changes.json";

const priceChanges: PriceChange = priceChange;

const chunks = chunkPlayers(priceChanges.priceUps, PLAYERS_PER_CHUNK);

export const UpPriceListDuration = Math.min(
  priceChanges.priceUps.length * SECONDS_PER_PLAYER,
  ChunksDuration(chunks),
);

export const UpPriceList = () => (
  <>
    {chunks.map((group, index) => {
      const groupDuration = PlayerGroupDuration(chunks, index);
      const startTime = BASE_START_TIME_SECONDS + index * groupDuration;

      return (
        <PriceList
          key={index}
          players={group}
          direction="up"
          startTimeInSeconds={startTime}
        />
      );
    })}
  </>
);
