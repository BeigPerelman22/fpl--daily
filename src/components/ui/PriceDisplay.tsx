import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

type Props = {
  newPrice: number;
  direction: "up" | "down";
};

export const PriceDisplay: React.FC<Props> = ({ newPrice, direction }) => {
  const isUp = direction === "up";
  const accentColor = isUp ? "#00FF87" : "#FF3131";
  const oldPrice = isUp
    ? parseFloat((newPrice - 0.1).toFixed(1))
    : parseFloat((newPrice + 0.1).toFixed(1));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
      <span style={{ color: accentColor, fontSize: 22, display: "flex", alignItems: "center", gap: 6 }}>
        {isUp ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
        {isUp ? "+0.1m" : "-0.1m"}
      </span>
      <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 42 }}>
        £{newPrice}m
      </span>
      <span style={{ color: "#9E9E9E", fontSize: 28, textDecoration: "line-through" }}>
        £{oldPrice}m
      </span>
    </div>
  );
};
