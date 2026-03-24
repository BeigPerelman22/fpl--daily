import { PriceList } from "./PriceList";
import { chunkPlayers } from "../lib/utils";
import {
  BASE_START_TIME_SECONDS,
  PLAYERS_PER_CHUNK,
  SECONDS_PER_PLAYER,
} from "../lib/video-constants";
import { PriceChange } from "../models/price-changes";
import priceChange from "../../public/assets/price-changes.json";

const priceChanges: PriceChange = priceChange;
const players = priceChanges.priceUps;
const chunks = chunkPlayers(players, PLAYERS_PER_CHUNK);

export const UpPriceListDuration =
  players.length > 0 ? players.length * SECONDS_PER_PLAYER : 0;

export const UpPriceList = () => {
  if (players.length === 0) return null;

  return (
    <>
      {/* One card per player, slides in independently */}
      {chunks.map((group, index) => (
        <PriceList
          key={index}
          players={group}
          direction="up"
          startTimeInSeconds={BASE_START_TIME_SECONDS + index * SECONDS_PER_PLAYER}
          variant="vertical"
        />
      ))}
    </>
  );
};
