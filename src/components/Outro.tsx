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
import { UpPriceListDuration } from "./UpPriceList";
import { DownPriceListDuration } from "./DownPriceList";
import { BASE_START_TIME_SECONDS } from "../lib/video-constants";
import { YouTubeLogo } from "./YouTubeLogo";

const CLICK_FRAME = 78; // frame when cursor clicks the icon

const fadeUp = (frame: number, start: number, duration = 10) => ({
  opacity: interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
  transform: `translateY(${interpolate(frame, [start, start + duration], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});

// Pointer / hand cursor SVG
const PointerCursor: React.FC = () => (
  <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Index finger */}
    <rect x="18" y="1" width="13" height="33" rx="6.5" fill="white" stroke="#222" strokeWidth="1.8" />
    {/* Middle finger */}
    <rect x="32" y="11" width="13" height="24" rx="6.5" fill="white" stroke="#222" strokeWidth="1.8" />
    {/* Ring finger */}
    <rect x="7" y="13" width="13" height="22" rx="6.5" fill="white" stroke="#222" strokeWidth="1.8" />
    {/* Gap fills between fingers */}
    <rect x="29" y="22" width="5" height="14" fill="white" />
    <rect x="18" y="24" width="3" height="12" fill="white" />
    {/* Palm */}
    <path d="M7 28 H45 V47 C45 53 41 58 35 58 H17 C11 58 7 53 7 47 Z" fill="white" stroke="#222" strokeWidth="1.8" strokeLinejoin="round" />
    {/* Thumb */}
    <path d="M7 35 C5 34 1 36 1 41 C1 46 5 48 7 48" fill="white" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const Outro: React.FC = () => {
  const startTime =
    BASE_START_TIME_SECONDS + UpPriceListDuration + DownPriceListDuration;
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame() - fps * startTime;

  // --- Text & divider (fast staggered entrance) ---
  const dividerWidth = interpolate(frame, [22, 38], [0, 75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- YouTube icon: phase 1 — smooth appear (frame 36-50), no bounce ---
  const ytAppearScale = interpolate(frame, [36, 50], [0.75, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const ytOpacity = interpolate(frame, [36, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- YouTube icon: phase 2 — bump on click (sin wave, 24 frames) ---
  const bumpFrame = frame - CLICK_FRAME;
  const bumpAmount =
    bumpFrame >= 0 && bumpFrame <= 24
      ? Math.sin((bumpFrame / 24) * Math.PI) * 0.38
      : 0;

  // --- YouTube icon: phase 3 — continuous pulse after bump ---
  const ytPulse =
    frame > CLICK_FRAME + 24
      ? interpolate(Math.sin((frame / fps) * Math.PI * 1.8), [-1, 1], [1, 1.07])
      : 1;
  const ytGlow = interpolate(
    Math.sin((frame / fps) * Math.PI * 1.8),
    [-1, 1],
    [frame > CLICK_FRAME ? 14 : 6, frame > CLICK_FRAME ? 34 : 12],
  );

  const ytFinalScale = ytAppearScale * (1 + bumpAmount) * ytPulse;

  // --- Cursor: appears at frame 58, glides to icon, clicks at CLICK_FRAME, fades out ---
  const cursorOpacity = interpolate(
    frame,
    [58, 65, CLICK_FRAME + 4, CLICK_FRAME + 18],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const cursorX = interpolate(frame, [58, CLICK_FRAME], [860, 490], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cursorY = interpolate(frame, [58, CLICK_FRAME], [1760, 1155], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  // Click: finger presses down then snaps back
  const clickScale = interpolate(
    frame,
    [CLICK_FRAME, CLICK_FRAME + 3, CLICK_FRAME + 8],
    [1, 0.58, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <Sequence from={fps * startTime} durationInFrames={fps * 5}>
      <Audio src={staticFile("assets/audio/outro_commentary.mp3")} />

      {/* Click sound fires exactly at click frame */}
      <Sequence from={CLICK_FRAME} durationInFrames={60}>
        <Audio src={staticFile("assets/audio/mouse-click-290204.mp3")} volume={1.2} />
      </Sequence>

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 30,
          padding: "0 60px",
        }}
      >
        {/* Pill badge */}
        <div
          style={{
            ...fadeUp(frame, 0),
            background: "linear-gradient(135deg, #00FF87, #00D4FF)",
            borderRadius: 100,
            padding: "16px 48px",
          }}
        >
          <span
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#0d0015",
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            FPL Daily
          </span>
        </div>

        {/* Main headline */}
        <div style={fadeUp(frame, 8)}>
          <span
            style={{
              fontSize: 92,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: -3,
              lineHeight: 1,
              display: "block",
              textAlign: "center",
            }}
          >
            Stay Ahead.
          </span>
        </div>

        {/* Subheading */}
        <div style={fadeUp(frame, 15)}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: 3,
              display: "block",
              textAlign: "center",
            }}
          >
            Price changes. Every morning.
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: `${dividerWidth}%`,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />

        {/* Like / Subscribe / Share */}
        <div
          style={{
            ...fadeUp(frame, 28),
            display: "flex",
            gap: 48,
            alignItems: "center",
          }}
        >
          {[
            { label: "Like", color: "rgba(255,255,255,0.7)" },
            { label: "Subscribe", color: "#FF3333" },
            { label: "Share", color: "rgba(255,255,255,0.7)" },
          ].map(({ label, color }) => (
            <span
              key={label}
              style={{
                fontSize: 28,
                fontWeight: 700,
                color,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* YouTube icon — smooth appear, then bumps on click, then pulses */}
        <div
          style={{
            transform: `scale(${ytFinalScale})`,
            opacity: ytOpacity,
            filter: `drop-shadow(0 0 ${ytGlow}px rgba(255, 40, 40, 0.85))`,
          }}
        >
          <YouTubeLogo />
        </div>

        {/* Pointer cursor — glides in, clicks, fades out */}
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            opacity: cursorOpacity,
            transform: `scale(${clickScale})`,
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          <PointerCursor />
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};
