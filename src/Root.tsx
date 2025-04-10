import { Composition } from "remotion";
import { FplPriceChangesVideo } from "./FplPriceChangesVideo";
import React from "react";

export const Root: React.FC = () => {
  return (
    <Composition
      id="fpl-video"
      component={FplPriceChangesVideo}
      durationInFrames={350}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
