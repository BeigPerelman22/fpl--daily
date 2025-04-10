import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";

export const  Title: React.FC<{ title: string,subTitle?: string }> = ({ title, subTitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence durationInFrames={fps * 2}>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            opacity,
            // fontSize: 80,
            fontWeight: 900,
            // marginBottom: 60,
            textShadow: "2px 2px 4px #000",
          }}
        >
          {title}
        </div>        <div
          style={{
            opacity,
            // fontSize: 80,
            fontWeight: 900,
            marginBottom: 60,
            textShadow: "2px 2px 4px #000",
          }}
        >
          {subTitle}
        </div>
      </div>
    </Sequence>
  );
};
