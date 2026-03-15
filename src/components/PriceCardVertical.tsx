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

const topBorderColor = (direction: "up" | "down") =>
  direction === "up" ? "#00FF87" : "#FF3131";

export const PriceCardVertical: React.FC<Props> = ({ player, direction }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#1C0626",
      borderRadius: 32,
      borderTop: `6px solid ${topBorderColor(direction)}`,
      padding: "48px 40px",
      width: 960,
      gap: 24,
    }}
  >
    <PlayerPhoto photoId={player.photoId} name={player.name} size={440} />
    <span style={{ color: "#FFFFFF", fontWeight: 600, fontSize: 68, fontFamily: "Space Grotesk, sans-serif", textAlign: "center" }}>
      {player.name}
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <PositionBadge positionType={player.positionType} />
      <OwnershipBadge ownedBy={player.ownedBy} />
    </div>
    <ClubInfo teamId={player.teamId} teamName={player.teamName} />
    <PriceDisplay newPrice={player.newPrice} direction={direction} />
    {player.commentary && (
      <span
        style={{
          color: "#FFFFFF",
          fontWeight: 400,
          fontSize: 32,
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          fontStyle: "italic",
          maxWidth: 800,
          marginTop: 12,
        }}
      >
        {player.news}
      </span>
    )}
  </div>
);
