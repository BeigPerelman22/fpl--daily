import { Sequence, useVideoConfig } from "remotion";
import { Title } from "./Title";
import { UpPriceListDuration } from "./UpPriceList";
import { DownPriceListDuration } from "./DownPriceList";

export const Outro = () => {
  const { fps } = useVideoConfig();
  const startTime = 2 + UpPriceListDuration + DownPriceListDuration;

  return (
    <Sequence from={fps * startTime} durationInFrames={fps * 2}>
      <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 100 }}>
        <Title title="Like & Subscribe for daily FPL updates!" />
      </div>
    </Sequence>
  );
};
