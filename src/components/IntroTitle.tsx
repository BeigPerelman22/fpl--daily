import React from "react";
import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { BASE_START_TIME_SECONDS } from "../lib/video-constants";

type Props = {
  subtitle?: string;
};

export const IntroTitle: React.FC<Props> = ({ subtitle }) => {
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
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 220,
          opacity,
          transform: `translateY(${slideY}px)`,
        }}
      >
        {/* Title */}
        <span
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "#FFFFFF",
            textShadow: "0 4px 20px rgba(0,255,135,0.3)",
            letterSpacing: 6,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Price Changes
        </span>


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
