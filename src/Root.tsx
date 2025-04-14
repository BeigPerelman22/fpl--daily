import { Composition } from "remotion";
import { FplPriceChangesVideo } from "./FplPriceChangesVideo";
import React from "react";
import { UpPriceListDuration } from "./components/UpPriceList";
import { DownPriceListDuration } from "./components/DownPriceList";
import { BASE_START_TIME_SECONDS } from "./lib/VideoConstants";

export const Root: React.FC = () => {
  const fps = 30;
  const introDuration = BASE_START_TIME_SECONDS; // assuming UpPriceList starts at 2s
  const outroDuration = 2;

  const totalDurationInSeconds =
    introDuration + UpPriceListDuration + DownPriceListDuration + outroDuration;

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
