import { type FC } from "react";
import { Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { UpPriceListDuration } from "./UpPriceList";
import { DownPriceListDuration } from "./DownPriceList";
import { BASE_START_TIME_SECONDS, OUTRO_DURATION_SECONDS } from "../lib/video-constants";
import { AUDIO_OUTRO_COMMENTARY } from "../lib/audio-constants";
import { YouTubeLogo } from "./YouTubeLogo";

export const Outro: FC = () => {
  const startTime =
    BASE_START_TIME_SECONDS + UpPriceListDuration + DownPriceListDuration;
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame() - fps * startTime;

  const scale = spring({ frame, fps, config: { damping: 200 } });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence from={fps * startTime} durationInFrames={fps * OUTRO_DURATION_SECONDS}>
      <Audio src={staticFile(AUDIO_OUTRO_COMMENTARY)} />
      <div className="absolute w-full h-full flex flex-col items-center justify-center gap-10 font-poppins">
        <span
          className="text-[70px] font-black text-white text-center tracking-[1px] text-shadow-green-glow"
          style={{ opacity }}
        >
          Like &amp; Subscribe for{" "}
          <span className="text-price-up">daily FPL updates!</span>
        </span>

        <div style={{ transform: `scale(${scale})`, opacity }}>
          <YouTubeLogo />
        </div>
      </div>
    </Sequence>
  );
};
