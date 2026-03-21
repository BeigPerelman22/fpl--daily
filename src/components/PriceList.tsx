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

  // Woosh: fast spring from off-screen right with slight overshoot
  const wooshSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, stiffness: 260, mass: 0.55 },
    durationInFrames: FADE_IN_DURATION_FRAMES,
  });

  const translateX = interpolate(wooshSpring, [0, 1], [1080, 0]);

  // Motion blur: heavy at start, gone by frame 10
  const blurPx = interpolate(localFrame, [0, 10], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(localFrame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence from={sequenceStart} durationInFrames={totalDurationInFrames}>
      <Audio
        src={staticFile("assets/audio/woosh.mp3")}
        volume={0.6}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          opacity,
          transform: `translateX(${translateX}px)`,
          filter: `blur(${blurPx}px)`,
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
