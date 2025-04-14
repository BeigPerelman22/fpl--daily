import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";
import "./IntroTitle.css";
import { BASE_START_TIME_SECONDS } from "../lib/VideoConstants";

export const IntroTitle: React.FC<{ title: string; subTitle?: string }> = ({ title, subTitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence durationInFrames={fps * BASE_START_TIME_SECONDS}>
      <div className="title-container">
        <div className="title-text" style={{ opacity }}>
          {title}
        </div>
        <div className="subtitle-text" style={{ opacity }}>
          {subTitle}
        </div>
      </div>
    </Sequence>
  );
};
