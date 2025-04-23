import { PlayerModel } from "../models/player.model";
import {
  MAX_GROUP_DURATION_SECONDS,
  SECONDS_PER_PLAYER,
} from "./VideoConstants";

export const getFormattedDate = () => {
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const date = new Date();
  return date.toLocaleDateString("en-US", options); // Format the date as "Month Day, Year"
};

export function chunkPlayers<T>(players: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < players.length; i += size) {
    chunks.push(players.slice(i, i + size));
  }
  return chunks;
}

export const ChunksDuration = (chunksPlayers: PlayerModel[][]): number => {
  let duration = 0;
  chunksPlayers.forEach((players) => {
    duration += Math.min(
      players.length * SECONDS_PER_PLAYER,
      MAX_GROUP_DURATION_SECONDS,
    );
  });
  return duration;
};

export const PlayerGroupDuration = (chunks: PlayerModel[][], index: number): number => {
  let groupDuration = 0;
  if (index) {
    groupDuration = Math.min(
      chunks[index - 1].length * SECONDS_PER_PLAYER,
      MAX_GROUP_DURATION_SECONDS,
    );
  }
  return groupDuration;
};
