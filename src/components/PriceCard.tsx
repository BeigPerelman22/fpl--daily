import { PlayerModel } from "../models/player.model";
import React from "react";
import { playerTypeMap } from "../data/player-type.map";
import { Img } from "remotion";
import "./PriceCard.css";

type Props = {
  player: PlayerModel;
  direction: "up" | "down";
};

export const PriceCard: React.FC<Props> = ({ player, direction }) => {
  return (
    <div className="price-card-container">
      <div className="price-card-inner">
        <div className="player-details">
          <Img
            src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photoId}.png`}
            alt={player.name}
            className="player-image"
          />
          <div className="player-info">
            <span className="player-name">{player.name}</span>
            <div className="player-meta">
              <span className="position-badge">{playerTypeMap[player.positionType]}</span>
              <span>•</span>
              <span className="price-direction" style={{ color: direction === "up" ? "rgb(0 206 99)" : "rgb(206,0,0)" }}>
                £{player.newPrice}m {direction === "up" ? "↑" : "↓"}
              </span>
            </div>
          </div>
        </div>
        <div className="ownership-info">
          <span style={{ color: direction === "up" ? "rgb(0 206 99)" : "rgb(206,0,0)" }}>
            {direction === "up" ? "+" : "-"}£0.1m
          </span>
          <span className="owned-by">Owned By: {player.ownedBy}%</span>
        </div>
      </div>
    </div>
  );
};
