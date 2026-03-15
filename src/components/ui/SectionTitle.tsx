import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import "./SectionTitle.css";

type Props = {
  direction: "up" | "down";
};

export const SectionTitle: React.FC<Props> = ({ direction }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isUp = direction === "up";

  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, config: { damping: 22, stiffness: 100 } });

  return (
    <div
      className="sectionTitle"
      style={{ opacity, transform: `translateY(${slideY}px) scale(${scale})` }}
    >
      <span className="sectionTitle__label">PRICE</span>
      <span className={`sectionTitle__main sectionTitle__main--${direction}`}>
        {isUp ? "RISES" : "FALLS"}
      </span>
      <div className={`sectionTitle__line sectionTitle__line--${direction}`} />
    </div>
  );
};
