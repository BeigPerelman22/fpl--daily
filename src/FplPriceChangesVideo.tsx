import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
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
  const frame = useCurrentFrame();

  const fadeInSeconds = 2;
  const fadeInFrames = fadeInSeconds * fps;

  // Pulse the midpoint color stop between #4a0057 and #7B00A0
  const midStop = interpolate(
    Math.sin((frame / fps) * Math.PI * 0.3),
    [-1, 1],
    [20, 45],
  );
  const background = `linear-gradient(180deg, #7B00A0 0%, #4a0057 ${midStop}%, #37003C 65%, #0d0015 100%)`;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "Poppins, sans-serif",
        color: "white",
        flexDirection: "column",
        padding: "40px",
        textAlign: "center",
        background,
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
        <Audio
          src={staticFile("assets/audio/commentary/all-players.mp3")}
          volume={1.0}
        />
      </Sequence>

      <Intro />
      <DownPriceList />
      <UpPriceList />
      <Outro />
    </AbsoluteFill>
  );
};
