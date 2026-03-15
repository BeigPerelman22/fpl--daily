import React from "react";
import { PlayerModel } from "../models/player.model";
import { PlayerPhoto } from "./ui/PlayerPhoto";
import { PositionBadge } from "./ui/PositionBadge";
import { OwnershipBadge } from "./ui/OwnershipBadge";
import { ClubInfo } from "./ui/ClubInfo";
import { PriceDisplay } from "./ui/PriceDisplay";

type Props = {
  player: PlayerModel;
  direction: "up" | "down";
};

const borderColor = (direction: "up" | "down") =>
  direction === "up" ? "rgba(0,255,135,0.25)" : "rgba(255,49,49,0.25)";

const stripeColor = (direction: "up" | "down") =>
  direction === "up" ? "#00FF87" : "#FF3131";

export const PriceCardHorizontal: React.FC<Props> = ({ player, direction }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#1C0626",
      border: `1px solid ${borderColor(direction)}`,
      borderRadius: 16,
      borderLeft: `6px solid ${stripeColor(direction)}`,
      padding: "20px 30px",
      width: "100%",
      marginTop: 20,
      gap: 20,
    }}
  >
    {/* Left: photo */}
    <PlayerPhoto photoId={player.photoId} name={player.name} size={160} />

    {/* Middle: player info */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <PositionBadge positionType={player.positionType} />
        <OwnershipBadge ownedBy={player.ownedBy} />
      </div>
      <span style={{ color: "#FFFFFF", fontWeight: 600, fontSize: 38, fontFamily: "Space Grotesk, sans-serif" }}>
        {player.name}
      </span>
      <ClubInfo teamId={player.teamId} teamName={player.teamName} />
      {player.commentary && (
        <span
          style={{
            color: "#FFFFFF",
            fontWeight: 400,
            fontSize: 24,
            fontFamily: "Poppins, sans-serif",
            fontStyle: "italic",
            marginTop: 8,
          }}
        >
          {player.commentary}
        </span>
      )}
    </div>

    {/* Right: price */}
    <PriceDisplay newPrice={player.newPrice} direction={direction} />
  </div>
);
