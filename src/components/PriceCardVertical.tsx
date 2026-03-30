import React, { useState } from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { PlayerModel } from "../models/player.model";
import { playerTypeMap } from "../data/player-type.map";

type Props = {
  player: PlayerModel;
  direction: "up" | "down";
};

const positionColors: Record<number, string> = {
  1: "#EBFF00",
  2: "#00B0FF",
  3: "#00FF87",
  4: "#FF5733",
};

const CARD_WIDTH = 880;
const CHAR_HEIGHT = 90;
const FONT_SIZE = 76;
const ANIM_START = 15;
const ANIM_END = 40;
const COLOR_FADE_END = 58;

type DigitProps = {
  oldChar: string;
  newChar: string;
  frame: number;
  color: string;
  accentColor: string;
  direction: "up" | "down";
};

const PriceDigit: React.FC<DigitProps> = ({ oldChar, newChar, frame, color, accentColor, direction }) => {
  const isAnimated = oldChar !== newChar;

  const progress = interpolate(frame, [ANIM_START, ANIM_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const sharedStyle: React.CSSProperties = {
    fontSize: FONT_SIZE,
    fontWeight: 800,
    letterSpacing: -1,
    position: "absolute",
    left: 0,
    right: 0,
    lineHeight: `${CHAR_HEIGHT}px`,
    textAlign: "center",
  };

  const accentOpacity = interpolate(frame, [ANIM_END, COLOR_FADE_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const whiteOpacity = interpolate(frame, [ANIM_END, COLOR_FADE_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  if (!isAnimated) {
    return (
      <div style={{ position: "relative", display: "inline-block", height: CHAR_HEIGHT, overflow: "hidden" }}>
        <span style={{ visibility: "hidden", fontSize: FONT_SIZE, fontWeight: 800, letterSpacing: -1, lineHeight: `${CHAR_HEIGHT}px` }}>
          {newChar}
        </span>
        <span style={{ ...sharedStyle, color: accentColor, top: 0, opacity: accentOpacity }}>{newChar}</span>
        <span style={{ ...sharedStyle, color, top: 0, opacity: whiteOpacity }}>{newChar}</span>
      </div>
    );
  }

  // Rises: old exits down, new enters from above. Falls: old exits up, new enters from below.
  const exitDir = direction === "up" ? CHAR_HEIGHT : -CHAR_HEIGHT;
  const enterDir = direction === "up" ? -CHAR_HEIGHT : CHAR_HEIGHT;

  const oldY = interpolate(progress, [0, 1], [0, exitDir]);
  const oldOpacity = interpolate(progress, [0, 0.4], [1, 0], { extrapolateRight: "clamp" });
  const newY = interpolate(progress, [0, 1], [enterDir, 0]);
  const newOpacity = interpolate(progress, [0.4, 1], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <div style={{ position: "relative", display: "inline-block", height: CHAR_HEIGHT, overflow: "hidden" }}>
      <span style={{ visibility: "hidden", fontSize: FONT_SIZE, fontWeight: 800, letterSpacing: -1, lineHeight: `${CHAR_HEIGHT}px` }}>
        {newChar}
      </span>
      <span style={{ ...sharedStyle, color: accentColor, top: 0, opacity: oldOpacity, transform: `translateY(${oldY}px)` }}>
        {oldChar}
      </span>
      <span style={{ ...sharedStyle, color: accentColor, top: 0, opacity: newOpacity * accentOpacity, transform: `translateY(${newY}px)` }}>
        {newChar}
      </span>
      <span style={{ ...sharedStyle, color, top: 0, opacity: newOpacity * whiteOpacity, transform: `translateY(${newY}px)` }}>
        {newChar}
      </span>
    </div>
  );
};

type PriceCounterProps = {
  oldStr: string;
  newStr: string;
  frame: number;
  color: string;
  accentColor: string;
  direction: "up" | "down";
};

const PriceCounter: React.FC<PriceCounterProps> = ({ oldStr, newStr, frame, color, accentColor, direction }) => {
  const maxLen = Math.max(oldStr.length, newStr.length);
  const paddedOld = oldStr.padStart(maxLen, " ");
  const paddedNew = newStr.padStart(maxLen, " ");

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: maxLen }).map((_, i) => (
        <PriceDigit
          key={i}
          oldChar={paddedOld[i]}
          newChar={paddedNew[i]}
          frame={frame}
          color={color}
          accentColor={accentColor}
          direction={direction}
        />
      ))}
    </div>
  );
};

export const PriceCardVertical: React.FC<Props> = ({ player, direction }) => {
  const [photoError, setPhotoError] = useState(false);
  const [badgeError, setBadgeError] = useState(false);

  const frame = useCurrentFrame();

  const COUNTER_START = 10;
  const COUNTER_END = 50;
  const rawOwnership = interpolate(frame, [COUNTER_START, COUNTER_END], [0, player.ownedBy], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const hasDecimal = player.ownedBy % 1 !== 0;
  const animatedOwnership = hasDecimal ? rawOwnership.toFixed(1) : Math.round(rawOwnership);

  const positionLabel = playerTypeMap[player.positionType] ?? "???";
  const positionColor = positionColors[player.positionType] ?? "#FFFFFF";
  const accentColor = direction === "up" ? "#00FF87" : "#FF3131";

  const oldPrice = direction === "up"
    ? Math.round((player.newPrice - 0.1) * 10) / 10
    : Math.round((player.newPrice + 0.1) * 10) / 10;

  const oldStr = `£${oldPrice.toFixed(1)}m`;
  const newStr = `£${player.newPrice.toFixed(1)}m`;

  return (
    <div
      style={{
        width: CARD_WIDTH,
        borderRadius: 36,
        overflow: "hidden",
        boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 0 3px ${accentColor}33`,
      }}
    >
      {/* Photo section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 920,
          background: "radial-gradient(ellipse at 60% 30%, #3a5fc8 0%, #1a2d7a 50%, #0d1540 100%)",
          overflow: "hidden",
        }}
      >
        <Img
          src={
            photoError
              ? staticFile("assets/player-placeholder.svg")
              : `https://resources.premierleague.com/premierleague25/photos/players/110x140/${player.photoId}.png`
          }
          alt={player.name}
          onError={() => setPhotoError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: photoError ? "contain" : "cover",
            objectPosition: "top center",
          }}
        />

        {/* Direction indicator ribbon top-right */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: accentColor,
            borderRadius: 100,
            padding: "12px 30px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "3px solid #0d0015",
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
              {direction === "up"
                ? <polyline points="18,15 12,9 6,15" stroke="#0d0015" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                : <polyline points="6,9 12,15 18,9" stroke="#0d0015" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}
            </svg>
        </div>

        {/* Club badge — white rounded square, bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            width: 130,
            height: 130,
            background: "white",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          }}
        >
          <Img
            src={
              badgeError
                ? staticFile("assets/club-placeholder.svg")
                : `https://resources.premierleague.com/premierleague25/badges-alt/${player.teamId}.svg`
            }
            alt={player.teamName}
            onError={() => setBadgeError(true)}
            style={{ width: 100, height: 100, objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Name strip — white */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "36px 36px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 70,
            fontWeight: 700,
            color: "#1a1a2e",
            fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: -1,
          }}
        >
          {player.name}
        </span>
      </div>

      {/* Price + Position strip — dark purple */}
      <div
        style={{
          background: "#37003C",
          padding: "40px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <PriceCounter oldStr={oldStr} newStr={newStr} frame={frame} color="#FFFFFF" accentColor={accentColor} direction={direction} />
        <span style={{ fontSize: 70, color: "#FFFFFF", fontWeight: 300 }}>•</span>
        <span style={{
          fontSize: 44,
          fontWeight: 700,
          color: "#1C0626",
          backgroundColor: positionColor,
          borderRadius: 12,
          padding: "8px 28px",
          letterSpacing: 1,
        }}>
          {positionLabel}
        </span>
      </div>

      {/* Ownership strip — cyan to green gradient */}
      <div
        style={{
          background: "linear-gradient(135deg, #00FF87 0%, #00D4FF 100%)",
          padding: "40px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 80, fontWeight: 900, color: "#0d0015" }}>
          {animatedOwnership}%
        </span>
        <span
          style={{
            fontSize: 68,
            fontWeight: 500,
            color: "rgba(0,0,0,0.55)",
            letterSpacing: 2,
          }}
        >
          Ownership
        </span>
      </div>
    </div>
  );
};
