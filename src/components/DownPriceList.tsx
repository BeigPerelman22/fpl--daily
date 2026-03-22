import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { PriceList } from "./PriceList";
import { UpPriceListDuration } from "./UpPriceList";
import { chunkPlayers } from "../lib/utils";
import {
  BASE_START_TIME_SECONDS,
  PLAYERS_PER_CHUNK,
  SECONDS_PER_PLAYER,
} from "../lib/video-constants";
import priceChange from "../../public/assets/price-changes.json";
import { PriceChange } from "../models/price-changes";

const priceChanges: PriceChange = priceChange;
const players = priceChanges.priceDowns;
const chunks = chunkPlayers(players, PLAYERS_PER_CHUNK);

export const DownPriceListDuration =
  players.length > 0 ? players.length * SECONDS_PER_PLAYER : 0;

export const DownPriceList = () => {
  const { fps } = useVideoConfig();
  if (players.length === 0) return null;

  const downStartTime = BASE_START_TIME_SECONDS + UpPriceListDuration;

  return (
    <>
      {/* One card per player, slides in independently */}
      {chunks.map((group, index) => (
        <PriceList
          key={index}
          players={group}
          direction="down"
          startTimeInSeconds={downStartTime + index * SECONDS_PER_PLAYER}
          variant="vertical"
        />
      ))}
    </>
  );
};
