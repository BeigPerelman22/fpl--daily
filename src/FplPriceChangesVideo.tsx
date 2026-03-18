import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { UpPriceList } from "./components/UpPriceList";
import { DownPriceList } from "./components/DownPriceList";
import { Outro } from "./components/Outro";
import { BASE_START_TIME_SECONDS } from "./lib/video-constants";
import { Intro } from "./components/Intro";
import { ProgressBar } from "./components/ProgressBar";

export const FplPriceChangesVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  const fadeInSeconds = 2;
  const fadeInFrames = fadeInSeconds * fps;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "Poppins, sans-serif",
        color: "white",
        flexDirection: "column",
        padding: "40px",
        textAlign: "center",
        background: "radial-gradient(ellipse at center, #4a0057 0%, #37003C 60%, #1a0022 100%)",
      }}
    >
      <ProgressBar introDurationInFrames={fps * BASE_START_TIME_SECONDS} />

      <Sequence from={fps * BASE_START_TIME_SECONDS}>
        <Audio
          startFrom={fps * 2}
          volume={(frame) =>
            interpolate(frame, [0, fadeInFrames], [0.1, 0.1], {
              extrapolateRight: "clamp",
            })
          }
          src={staticFile("assets/audio/disco-funk.mp3")}
        />
      </Sequence>

      <Intro />
      <DownPriceList />
      <UpPriceList />
      <Outro />
    </AbsoluteFill>
  );
};
