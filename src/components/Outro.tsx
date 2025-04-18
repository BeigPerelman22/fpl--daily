import {
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { UpPriceListDuration } from "./UpPriceList";
import { DownPriceListDuration } from "./DownPriceList";
import { BASE_START_TIME_SECONDS } from "../lib/VideoConstants";
import { YouTubeLogo } from "./YouTubeLogo";

export const Outro = () => {
  const startTime =
    BASE_START_TIME_SECONDS + UpPriceListDuration + DownPriceListDuration;
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame() - fps * startTime;

  const scale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence from={fps * startTime} durationInFrames={fps * 2}>
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            opacity,
            fontWeight: 900,
            textShadow: "2px 2px 4px #000",
            marginBottom: "60px",
          }}
        >
          Like & Subscribe for daily FPL updates!
        </div>
        <div style={{ transform: `scale(${scale})` }}>
          <YouTubeLogo />
        </div>
      </div>
    </Sequence>
  );
};
