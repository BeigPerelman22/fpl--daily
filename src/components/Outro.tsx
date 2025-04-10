import { Sequence, useVideoConfig } from "remotion";
import { Title } from "./Title";

export const Outro = () => {
  const { fps } = useVideoConfig();
  return (
    <Sequence from={fps * 10} durationInFrames={fps * 2}>
      <div style={{fontFamily: "Poppins, sans-serif", fontSize: 100 }}>
        <Title title="Like & Subscribe for daily FPL updates!"></Title>
      </div>
    </Sequence>
  );
};
