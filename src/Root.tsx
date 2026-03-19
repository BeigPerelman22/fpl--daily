import { type FC } from "react";
import { Composition } from "remotion";
import { FplPriceChangesVideo } from "./FplPriceChangesVideo";
import { UpPriceListDuration } from "./components/UpPriceList";
import { DownPriceListDuration } from "./components/DownPriceList";
import { BASE_START_TIME_SECONDS, OUTRO_DURATION_SECONDS } from "./lib/video-constants";

export const Root: FC = () => {
  const fps = 30;

  const totalDurationInSeconds =
    BASE_START_TIME_SECONDS + UpPriceListDuration + DownPriceListDuration + OUTRO_DURATION_SECONDS;

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
