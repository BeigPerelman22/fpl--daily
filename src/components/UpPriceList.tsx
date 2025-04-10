import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PriceCard } from "./PriceCard";
import { priceUps } from "../data/mock-price-changes";

export const UpPriceList = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [fps * 2, fps * 2 + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence from={fps * 2} durationInFrames={fps * 4}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            color: "#90ee90",
            fontSize: 120,
            opacity,
            fontWeight: 900,
            marginBottom: 60,
            textShadow: "3px 3px 0px black, -3px -3px 0px black, 3px -3px 0px black, -3px 3px 0px black", // Text border
          }}
        >
          <span>Price Rises</span>
        </div>
        <div
          style={{
            opacity,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "30px",
          }}
        >

          {priceUps.map((p, i) => (
            <PriceCard key={i} player={p} direction="up" />
          ))}
        </div>
      </div>
    </Sequence>
  );
};
