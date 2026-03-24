import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { IntroTitle } from "./IntroTitle";
import { BASE_START_TIME_SECONDS } from "../lib/video-constants";
import { getFormattedDate } from "../lib/utils";
import priceChange from "../../public/assets/price-changes.json";

const risesCount = priceChange.priceUps.length;
const fallsCount = priceChange.priceDowns.length;
const gameweek = (priceChange as { gameweek?: number }).gameweek ?? null;

export const Intro: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Stat pills: smooth scale-in, no overshoot
  const risesPillScale = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const fallsPillScale = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const dateOpacity = interpolate(frame, [0, 20], [0, 1], {
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
          {/* Stat pills: rises + falls count */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>
            {/* Rises pill */}
            <div
              style={{
                transform: `scale(${risesPillScale})`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: "rgba(0,255,135,0.12)",
                border: "3px solid rgba(0,255,135,0.4)",
                borderRadius: 160,
                padding: "40px 72px",
                minHeight: 160,
                minWidth: 560,
              }}
            >
              <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(0,255,135,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <polyline points="18,15 12,9 6,15" stroke="#00FF87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 90, fontWeight: 900, color: "#00FF87", lineHeight: 1 }}>{risesCount}</span>
              <span style={{ fontSize: 72, fontWeight: 500, color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}>
                RISES
              </span>
            </div>

            {/* Falls pill */}
            <div
              style={{
                transform: `scale(${fallsPillScale})`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: "rgba(255,49,49,0.12)",
                border: "3px solid rgba(255,49,49,0.4)",
                borderRadius: 160,
                padding: "40px 72px",
                minHeight: 160,
                minWidth: 560,
              }}
            >
              <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(255,49,49,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <polyline points="6,9 12,15 18,9" stroke="#FF3131" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 90, fontWeight: 900, color: "#FF3131", lineHeight: 1 }}>{fallsCount}</span>
              <span style={{ fontSize: 72, fontWeight: 500, color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}>
                FALLS
              </span>
            </div>
          </div>

          {/* Date | GW label */}
          <span
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: "#FFFFFF",
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: dateOpacity * 0.8,
              maxWidth: 560,
              textAlign: "center",
            }}
          >
            {getFormattedDate()}{gameweek != null ? ` | GW${gameweek}` : ""}
          </span>

        </AbsoluteFill>

        {/* Date at bottom */}
        <div style={{ zIndex: 1, width: "100%", height: "100%" }}>
          <IntroTitle />
        </div>
      </Sequence>
    </>
  );
};
