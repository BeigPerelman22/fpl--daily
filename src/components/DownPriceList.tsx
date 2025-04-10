import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PriceCard } from "./PriceCard";
import { PlayerModel } from "../models/player.model";
import { priceDowns } from "../data/mock-price-changes";

export const DownPriceList = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [fps * 6, fps * 6 + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence from={fps * 6} durationInFrames={fps * 4}>
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
            opacity,
            color: "#ff7f7f",
            fontSize: 120,
            fontWeight: 900,
            marginBottom: 60,
            textShadow: "3px 3px 0px black, -3px -3px 0px black, 3px -3px 0px black, -3px 3px 0px black", // Text border
          }}
        >
          <span>Price Fallers</span>
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
          {priceDowns.map((p: PlayerModel, i) => (
            <PriceCard key={i} player={p} direction="down" />
          ))}
        </div>
      </div>
    </Sequence>
  );
};
