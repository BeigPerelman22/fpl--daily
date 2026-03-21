import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { IntroTitle } from "./IntroTitle";
import { getFormattedDate } from "../lib/utils";
import { BASE_START_TIME_SECONDS } from "../lib/video-constants";
import priceChange from "../../public/assets/price-changes.json";

const risesCount = priceChange.priceUps.length;
const fallsCount = priceChange.priceDowns.length;

export const Intro: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Chip: spring bounce in from scale 0
  const chipSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 160, mass: 0.7 },
  });

  // Chip glow pulse (starts after it lands ~frame 20)
  const glowFrame = Math.max(0, frame - 20);
  const glowSize = interpolate(
    Math.sin((glowFrame / fps) * Math.PI * 1.4),
    [-1, 1],
    [20, 55],
  );
  const glowOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shimmer sliding across chip
  const shimmerX = interpolate(frame, [0, fps * BASE_START_TIME_SECONDS], [-300, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  // "Price Changes" label
  const labelOpacity = interpolate(frame, [22, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [22, 36], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat pills: smooth scale-in, no overshoot
  const risesPillScale = interpolate(frame, [38, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const fallsPillScale = interpolate(frame, [46, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Hook question fades up at frame 58
  const hookOpacity = interpolate(frame, [58, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hookY = interpolate(frame, [58, 72], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Sequence durationInFrames={fps * 3}>
        <Audio src={staticFile("assets/audio/intro.mp3")} />
      </Sequence>
      <Sequence durationInFrames={fps * BASE_START_TIME_SECONDS}>
        <Audio src={staticFile("assets/audio/intro_commentary.mp3")} />
      </Sequence>

      <Sequence durationInFrames={fps * BASE_START_TIME_SECONDS}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
            paddingTop: 300,
          }}
        >
          {/* Glow halo behind chip */}
          <div
            style={{
              position: "absolute",
              width: 700,
              height: 200,
              borderRadius: 200,
              background: "radial-gradient(ellipse, rgba(0,255,135,0.18) 0%, transparent 70%)",
              filter: `blur(${glowSize}px)`,
              opacity: glowOpacity,
            }}
          />

          {/* FPL Daily chip */}
          <div
            style={{
              transform: `scale(${chipSpring})`,
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, #00FF87, #00D4FF)",
              borderRadius: 140,
              padding: "28px 88px",
              boxShadow: "0 8px 60px rgba(0,255,135,0.35)",
            }}
          >
            {/* Shimmer overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: shimmerX,
                width: 120,
                height: "100%",
                background:
                  "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                fontSize: 78,
                fontWeight: 900,
                color: "#0d0015",
                letterSpacing: 6,
                textTransform: "uppercase",
                display: "block",
              }}
            >
              FPL Daily
            </span>
          </div>

          {/* "Price Changes" subtitle */}
          <div style={{ opacity: labelOpacity, transform: `translateY(${labelY}px)` }}>
            <span
              style={{
                fontSize: 52,
                fontWeight: 700,
                background: "linear-gradient(135deg, #00FF87, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: 8,
                textTransform: "uppercase",
              }}
            >
              Price Changes
            </span>
          </div>

          {/* Stat pills: rises + falls count */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {/* Rises pill */}
            <div
              style={{
                transform: `scale(${risesPillScale})`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(0,255,135,0.12)",
                border: "2px solid rgba(0,255,135,0.4)",
                borderRadius: 100,
                padding: "24px 36px",
                minHeight: 100,
              }}
            >
              <div style={{ width: 58, height: 58, borderRadius: "50%", background: "rgba(0,255,135,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <polyline points="18,15 12,9 6,15" stroke="#00FF87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 42, fontWeight: 900, color: "#00FF87", lineHeight: 1 }}>{risesCount}</span>
              <span style={{ fontSize: 38, fontWeight: 500, color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}>
                RISES
              </span>
            </div>

            {/* Divider dot */}
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              opacity: risesPillScale,
            }} />

            {/* Falls pill */}
            <div
              style={{
                transform: `scale(${fallsPillScale})`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(255,49,49,0.12)",
                border: "2px solid rgba(255,49,49,0.4)",
                borderRadius: 100,
                padding: "24px 36px",
                minHeight: 100,
              }}
            >
              <div style={{ width: 58, height: 58, borderRadius: "50%", background: "rgba(255,49,49,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <polyline points="6,9 12,15 18,9" stroke="#FF3131" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 42, fontWeight: 900, color: "#FF3131", lineHeight: 1 }}>{fallsCount}</span>
              <span style={{ fontSize: 38, fontWeight: 500, color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}>
                FALLS
              </span>
            </div>
          </div>

          {/* Hook question */}
          <div
            style={{
              opacity: hookOpacity,
              transform: `translateY(${hookY}px)`,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 45,
                fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: 1,
              }}
            >
              Is your player on the list?
            </span>
          </div>
        </AbsoluteFill>

        {/* Date at bottom */}
        <div style={{ zIndex: 1, width: "100%", height: "100%" }}>
          <IntroTitle title={getFormattedDate()} />
        </div>
      </Sequence>
    </>
  );
};
