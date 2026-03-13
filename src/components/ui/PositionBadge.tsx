import React from "react";
import { playerTypeMap } from "../../data/player-type.map";

type Props = {
  positionType: number;
};

const positionColors: Record<number, string> = {
  1: "#EBFF00", // GKP — yellow
  2: "#00B0FF", // DEF — blue
  3: "#00FF87", // MID — FPL green
  4: "#FF5733", // FWD — orange-red
};

export const PositionBadge: React.FC<Props> = ({ positionType }) => {
  const color = positionColors[positionType] ?? "#FFFFFF";
  const label = playerTypeMap[positionType] ?? "???";

  return (
    <span
      style={{
        backgroundColor: color,
        color: "#1C0626",
        fontWeight: 700,
        fontSize: 22,
        borderRadius: 8,
        padding: "4px 14px",
        letterSpacing: 1,
      }}
    >
      {label}
    </span>
  );
};
