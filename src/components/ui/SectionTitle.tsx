import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

type Props = {
  direction: "up" | "down";
};

export const SectionTitle: React.FC<Props> = ({ direction }) => {
  const isUp = direction === "up";
  const color = isUp ? "#00FF87" : "#FF3131";
  const label = isUp ? "Price Rises" : "Price Fallers";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        fontSize: 80,
        fontWeight: 900,
        color,
        textShadow: "3px 3px 0px #0a0010, -3px -3px 0px #0a0010",
        letterSpacing: 2,
        marginBottom: 40,
      }}
    >
      {isUp ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
      {label}
      {isUp ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
    </div>
  );
};
