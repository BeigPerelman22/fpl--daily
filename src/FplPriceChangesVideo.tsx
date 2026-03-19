import { type FC } from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { UpPriceList } from "./components/UpPriceList";
import { DownPriceList } from "./components/DownPriceList";
import { Outro } from "./components/Outro";
import { AUDIO_FADE_IN_SECONDS, BASE_START_TIME_SECONDS } from "./lib/video-constants";
import { AUDIO_BACKGROUND, AUDIO_COMMENTARY_ALL } from "./lib/audio-constants";
import { Intro } from "./components/Intro";
import { ProgressBar } from "./components/ProgressBar";
import "./styles/global.css";

export const FplPriceChangesVideo: FC = () => {
  const { fps } = useVideoConfig();
  const fadeInFrames = AUDIO_FADE_IN_SECONDS * fps;

  return (
    <AbsoluteFill className="video-background text-white flex-col p-[40px] text-center font-poppins">
      <ProgressBar introDurationInFrames={fps * BASE_START_TIME_SECONDS} />

      <Sequence from={fps * BASE_START_TIME_SECONDS}>
        <Audio
          startFrom={fps * 2}
          volume={(frame) =>
            interpolate(frame, [0, fadeInFrames], [0.1, 0.1], {
              extrapolateRight: "clamp",
            })
          }
          src={staticFile(AUDIO_BACKGROUND)}
        />
        <Audio src={staticFile(AUDIO_COMMENTARY_ALL)} volume={1.0} />
      </Sequence>

      <Intro />
      <DownPriceList />
      <UpPriceList />
      <Outro />
    </AbsoluteFill>
  );
};
