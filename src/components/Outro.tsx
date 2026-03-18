import React from "react";
import { Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { UpPriceListDuration } from "./UpPriceList";
import { DownPriceListDuration } from "./DownPriceList";
import { BASE_START_TIME_SECONDS } from "../lib/video-constants";
import { YouTubeLogo } from "./YouTubeLogo";

export const Outro: React.FC = () => {
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
    <Sequence from={fps * startTime} durationInFrames={fps * 5}>
      <Audio src={staticFile("assets/audio/outro_commentary.mp3")} />
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <span
          style={{
            fontSize: 70,
            fontWeight: 900,
            color: "#FFFFFF",
            textShadow: "0 4px 20px rgba(0,255,135,0.4)",
            opacity,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Like &amp; Subscribe for{" "}
          <span style={{ color: "#00FF87" }}>daily FPL updates!</span>
        </span>

        <div style={{ transform: `scale(${scale})`, opacity }}>
          <YouTubeLogo />
        </div>
      </div>
    </Sequence>
  );
};
