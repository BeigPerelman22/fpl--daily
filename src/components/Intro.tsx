import { type FC } from "react";
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
import { BASE_START_TIME_SECONDS } from "../lib/video-constants";
import { AUDIO_INTRO, AUDIO_INTRO_COMMENTARY } from "../lib/audio-constants";

export const Intro: FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Sequence durationInFrames={fps * 3}>
        <Audio src={staticFile(AUDIO_INTRO)} />
      </Sequence>
      <Sequence durationInFrames={fps * BASE_START_TIME_SECONDS}>
        <Audio src={staticFile(AUDIO_INTRO_COMMENTARY)} />
      </Sequence>
      <Sequence durationInFrames={fps * BASE_START_TIME_SECONDS}>
        <AbsoluteFill className="z-0" style={{ opacity: logoOpacity }}>
          <Img
            src={staticFile("assets/images/logo.png")}
            className="w-full h-full object-cover"
          />
        </AbsoluteFill>
        <div className="z-[1] w-full h-full">
          <IntroTitle title={getFormattedDate()} />
        </div>
      </Sequence>
    </>
  );
};
