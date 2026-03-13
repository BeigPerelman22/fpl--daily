import React from "react";
import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { PlayerModel } from "../models/player.model";
import { SectionTitle } from "./ui/SectionTitle";
import { PriceCardHorizontal } from "./PriceCardHorizontal";
import { PriceCardVertical } from "./PriceCardVertical";
import {
  FADE_IN_DURATION_FRAMES,
  MAX_GROUP_DURATION_SECONDS,
  SECONDS_PER_PLAYER,
} from "../lib/VideoConstants";

type Props = {
  players: PlayerModel[];
  direction: "up" | "down";
  startTimeInSeconds: number;
  variant?: "horizontal" | "vertical";
};

export const PriceList: React.FC<Props> = ({
  players,
  direction,
  startTimeInSeconds,
  variant = "horizontal",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const durationInSeconds = Math.min(
    players.length * SECONDS_PER_PLAYER,
    MAX_GROUP_DURATION_SECONDS,
  );
  const sequenceStart = fps * startTimeInSeconds;
  const totalDurationInFrames = Math.ceil(durationInSeconds * fps);

  const opacity = interpolate(
    frame,
    [sequenceStart, sequenceStart + FADE_IN_DURATION_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <Sequence from={sequenceStart} durationInFrames={totalDurationInFrames}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          opacity,
        }}
      >
        <SectionTitle direction={direction} />

        <div
          style={{
            display: "flex",
            flexDirection: variant === "vertical" ? "row" : "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: variant === "vertical" ? "flex-start" : "stretch",
            gap: variant === "vertical" ? 20 : 0,
            width: "100%",
          }}
        >
          {players.map((player, i) =>
            variant === "vertical" ? (
              <PriceCardVertical key={i} player={player} direction={direction} />
            ) : (
              <PriceCardHorizontal key={i} player={player} direction={direction} />
            ),
          )}
        </div>
      </div>
    </Sequence>
  );
};
