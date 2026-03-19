import { type FC } from "react";
import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { PlayerModel } from "../models/player.model";
import { PriceCardHorizontal } from "./PriceCardHorizontal";
import { PriceCardVertical } from "./PriceCardVertical";
import { MAX_GROUP_DURATION_SECONDS, SECONDS_PER_PLAYER } from "../lib/video-constants";
import { AUDIO_MOUSE_CLICK } from "../lib/audio-constants";
import { PriceDirection } from "../types/direction";
import { useCardAnimation } from "../hooks/useCardAnimation";

type Props = {
  players: PlayerModel[];
  direction: PriceDirection;
  startTimeInSeconds: number;
  variant?: "horizontal" | "vertical";
};

export const PriceList: FC<Props> = ({
  players,
  direction,
  startTimeInSeconds,
  variant = "horizontal",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const durationInSeconds = Math.min(players.length * SECONDS_PER_PLAYER, MAX_GROUP_DURATION_SECONDS);
  const sequenceStart = fps * startTimeInSeconds;
  const totalDurationInFrames = Math.ceil(durationInSeconds * fps);
  const localFrame = frame - sequenceStart;

  const { opacity, slideX, scale } = useCardAnimation(localFrame, fps);

  const CardComponent = variant === "vertical" ? PriceCardVertical : PriceCardHorizontal;

  return (
    <Sequence from={sequenceStart} durationInFrames={totalDurationInFrames}>
      <Audio src={staticFile(AUDIO_MOUSE_CLICK)} volume={0.5} />
      <div
        className="absolute w-full h-full flex flex-col items-center justify-center gap-5"
        style={{ opacity, transform: `translateX(${slideX}px) scale(${scale})` }}
      >
        {players.map((player) => (
          <CardComponent key={player.id} player={player} direction={direction} />
        ))}
      </div>
    </Sequence>
  );
};
