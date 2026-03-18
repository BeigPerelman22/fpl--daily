import React from "react";
import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { BASE_START_TIME_SECONDS } from "../lib/video-constants";

type Props = {
  title: string;
  subtitle?: string;
};

export const IntroTitle: React.FC<Props> = ({ title, subtitle }) => {
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
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 80,
          opacity,
          transform: `translateY(${slideY}px)`,
        }}
      >
        {/* Label */}
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#00FF87",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          FPL Price Changes
        </span>

        {/* Date */}
        <span
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "#FFFFFF",
            textShadow: "0 4px 20px rgba(0,255,135,0.3)",
            lineHeight: 1,
          }}
        >
          {title}
        </span>

        {/* Green underline accent */}
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: "#00FF87",
            borderRadius: 3,
            marginTop: 20,
          }}
        />

        {subtitle && (
          <span
            style={{
              fontSize: 40,
              fontWeight: 400,
              color: "#9E9E9E",
              marginTop: 24,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </Sequence>
  );
};
