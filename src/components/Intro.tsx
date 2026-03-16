import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { IntroTitle } from "./IntroTitle";
import { getFormattedDate } from "../lib/utils";
import { BASE_START_TIME_SECONDS } from "../lib/VideoConstants";

export const Intro: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Sequence durationInFrames={fps * 3}>
        <Audio src={staticFile("assets/audio/intro.mp3")} />
      </Sequence>
      <Sequence durationInFrames={fps * BASE_START_TIME_SECONDS}>
        <Audio src={staticFile("assets/audio/intro_commentary.mp3")} />
      </Sequence>
      <Sequence durationInFrames={fps * BASE_START_TIME_SECONDS}>
        <AbsoluteFill style={{ zIndex: 0, opacity: logoOpacity }}>
          <Img
            src={staticFile("assets/images/logo.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <div style={{ zIndex: 1, width: "100%", height: "100%" }}>
          <IntroTitle title={getFormattedDate()} />
        </div>
      </Sequence>
    </>
  );
};
