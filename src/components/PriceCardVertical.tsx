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
      borderRadius: 16,
      borderTop: `4px solid ${topBorderColor(direction)}`,
      padding: "24px 20px",
      width: 460,
      gap: 12,
    }}
  >
    <PlayerPhoto photoId={player.photoId} name={player.name} size={200} />
    <span style={{ color: "#FFFFFF", fontWeight: 600, fontSize: 34, fontFamily: "Space Grotesk, sans-serif", textAlign: "center" }}>
      {player.name}
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <PositionBadge positionType={player.positionType} />
      <OwnershipBadge ownedBy={player.ownedBy} />
    </div>
    <ClubInfo teamId={player.teamId} teamName={player.teamName} />
    <PriceDisplay newPrice={player.newPrice} direction={direction} />
  </div>
);
