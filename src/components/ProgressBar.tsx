import { type FC } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  introDurationInFrames: number;
};

export const ProgressBar: FC<Props> = ({ introDurationInFrames }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(
    frame,
    [introDurationInFrames, durationInFrames],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div className="absolute top-0 left-0 z-[100] w-full h-2 bg-white/10">
      <div
        className="h-full rounded-r-[3px]"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg, #00FF87, #00D4FF)" }}
      />
    </div>
  );
};
