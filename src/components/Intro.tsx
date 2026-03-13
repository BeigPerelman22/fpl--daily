import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { IntroTitle } from "./IntroTitle";
import { getFormattedDate } from "../lib/utils";

export const Intro: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <Sequence durationInFrames={fps * 3}>
        <Audio src={staticFile("assets/audio/intro.mp3")} />
      </Sequence>
      <IntroTitle title={getFormattedDate()} />
    </>
  );
};
