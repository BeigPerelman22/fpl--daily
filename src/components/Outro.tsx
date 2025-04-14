import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { UpPriceListDuration } from "./UpPriceList";
import { DownPriceListDuration } from "./DownPriceList";
import { BASE_START_TIME_SECONDS } from "../lib/VideoConstants";

export const Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const startTime =
    BASE_START_TIME_SECONDS + UpPriceListDuration + DownPriceListDuration;

  return (
    <Sequence from={fps * startTime} durationInFrames={fps * 2}>
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
      </div>
    </Sequence>
  );
};
