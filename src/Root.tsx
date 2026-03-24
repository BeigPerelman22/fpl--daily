import { Composition } from "remotion";
import { FplPriceChangesVideo } from "./FplPriceChangesVideo";
import React from "react";
import { UpPriceListDuration } from "./components/UpPriceList";
import { DownPriceListDuration } from "./components/DownPriceList";
import { BASE_START_TIME_SECONDS } from "./lib/video-constants";

export const Root: React.FC = () => {
  const fps = 30;
  const introDuration = BASE_START_TIME_SECONDS; // assuming UpPriceList starts at 2s
  const totalDurationInSeconds =
    introDuration + UpPriceListDuration + DownPriceListDuration;

  const durationInFrames = Math.ceil(totalDurationInSeconds * fps);

  return (
    <Composition
      id="fpl-video"
      component={FplPriceChangesVideo}
      durationInFrames={durationInFrames}
      fps={fps}
      width={1080}
      height={1920}
    />
  );
};
