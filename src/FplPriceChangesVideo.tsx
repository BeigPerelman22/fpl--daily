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
import { UpPriceList, UpPriceListDuration } from "./components/UpPriceList";
import { DownPriceList, DownPriceListDuration } from "./components/DownPriceList";
import { Outro } from "./components/Outro";
import { BASE_START_TIME_SECONDS } from "./lib/video-constants";
import { Intro } from "./components/Intro";
import { ProgressBar } from "./components/ProgressBar";

export const FplPriceChangesVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const fadeInSeconds = 2;
  const fadeInFrames = fadeInSeconds * fps;

  // Pulsing mid-stop
  const midStop = interpolate(
    Math.sin((frame / fps) * Math.PI * 0.3),
    [-1, 1],
    [30, 50],
  );

  // Timing
  const risesStart = fps * BASE_START_TIME_SECONDS;
  const risesEnd = fps * (BASE_START_TIME_SECONDS + UpPriceListDuration);
  const fallsEnd = fps * (BASE_START_TIME_SECONDS + UpPriceListDuration + DownPriceListDuration);

  // Green overlay during rises
  const greenOpacity = interpolate(
    frame,
    [risesStart, risesStart + 20, risesEnd - 20, risesEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Red overlay during falls
  const redOpacity = interpolate(
    frame,
    [risesEnd, risesEnd + 20, fallsEnd - 20, fallsEnd],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Purple base (intro/outro)
  const purpleBackground = `linear-gradient(180deg, #7B00A0 0%, #4a0057 ${midStop}%, #37003C 65%, #0d0015 100%)`;

  // FPL light green
  const greenBackground = `linear-gradient(180deg, #00FF87 0%, #00D4FF ${midStop}%, #00c4f0 100%)`;

  // Red gradient for falls
  const redBackground = `linear-gradient(180deg, #FF3131 0%, #FF6B35 ${midStop}%, #cc1a1a 100%)`;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "Poppins, sans-serif",
        color: "white",
        flexDirection: "column",
        padding: "40px",
        textAlign: "center",
        background: purpleBackground,
      }}
    >
      {/* Green overlay during rises */}
      <AbsoluteFill style={{ background: greenBackground, opacity: greenOpacity, zIndex: 0 }} />
      {/* Red overlay during falls */}
      <AbsoluteFill style={{ background: redBackground, opacity: redOpacity, zIndex: 0 }} />

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
