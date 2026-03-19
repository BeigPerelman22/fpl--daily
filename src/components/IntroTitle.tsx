import { type FC } from "react";
import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { BASE_START_TIME_SECONDS } from "../lib/video-constants";

const LABEL_TEXT = "FPL Price Changes";

type Props = {
  title: string;
  subtitle?: string;
};

export const IntroTitle: FC<Props> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideY = interpolate(frame, [0, 18], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence durationInFrames={fps * BASE_START_TIME_SECONDS}>
      <div
        className="h-full w-full flex flex-col justify-end items-center pb-20"
        style={{ opacity, transform: `translateY(${slideY}px)` }}
      >
        {/* Label */}
        <span className="text-[36px] font-bold tracking-[6px] text-price-up uppercase mb-4">
          {LABEL_TEXT}
        </span>

        {/* Date */}
        <span className="text-[110px] font-black text-white leading-none text-shadow-green-glow">
          {title}
        </span>

        {/* Green underline accent */}
        <div className="w-[120px] h-[6px] bg-price-up rounded-[3px] mt-5" />

        {subtitle && (
          <span className="text-[40px] font-normal text-text-muted mt-6">
            {subtitle}
          </span>
        )}
      </div>
    </Sequence>
  );
};
