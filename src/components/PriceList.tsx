import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PlayerModel } from "../models/player.model";
import { PriceCardHorizontal } from "./PriceCardHorizontal";
import { PriceCardVertical } from "./PriceCardVertical";
import { FADE_IN_DURATION_FRAMES, MAX_GROUP_DURATION_SECONDS, SECONDS_PER_PLAYER } from "../lib/video-constants";

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

  const localFrame = frame - sequenceStart;

  const opacity = interpolate(
    localFrame,
    [0, FADE_IN_DURATION_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const slideX = interpolate(
    localFrame,
    [0, FADE_IN_DURATION_FRAMES],
    [80, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cardScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
    durationInFrames: FADE_IN_DURATION_FRAMES,
  });

  return (
    <Sequence from={sequenceStart} durationInFrames={totalDurationInFrames}>
      <Audio
        src={staticFile("assets/audio/mouse-click-290204.mp3")}
        volume={0.5}
      />
      {players[0]?.id && (
        <Audio
          src={staticFile(`assets/audio/commentary/${players[0].id}.mp3`)}
          volume={1.0}
          startFrom={0}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          opacity,
          transform: `translateX(${slideX}px) scale(${cardScale})`,
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
    </Sequence>
  );
};
