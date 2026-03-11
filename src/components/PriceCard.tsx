import { PlayerModel } from "../models/player.model";
import React from "react";
import { playerTypeMap } from "../data/player-type.map";
import { Img } from "remotion";
import "./PriceCard.css";
import { FiUsers } from "react-icons/fi";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

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
            className="player-image"
            src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photoId}.png`}
            alt={player.name}
          />
          <div className="player-info">
            <div className="player-meta">
              <span className="position-badge">
                {playerTypeMap[player.positionType]}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
                className="owned-by"
              >
                <FiUsers />
                <span>{player.ownedBy}%</span>
              </div>
              {/*<span>•</span>*/}
              {/*<span*/}
              {/*  className="price-direction"*/}
              {/*  style={{*/}
              {/*    color: direction === "up" ? "rgb(0 206 99)" : "rgb(206,0,0)",*/}
              {/*  }}*/}
              {/*>*/}
              {/*  £{player.newPrice}m {direction === "up" ? "↑" : "↓"}*/}
              {/*</span>*/}
            </div>
            <span className="player-name">{player.name}</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15
              }}
            >
              <Img
                src={`https://resources.premierleague.com/premierleague/badges/rb/t${player.teamId}.svg`}
                alt={player.name}
                className="club-badge"
              />
              <span className="owned-by">{player.teamName}</span>
            </div>
          </div>
        </div>
        <div className="price-info">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              color: direction === "up" ? "rgb(0 206 99)" : "rgb(206,0,0)",
              gap: 15,
              paddingBottom: 20,
            }}
          >
            {direction === "up" ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
            {direction === "up" ? "+" : "-"}0.1
          </span>
          <span
            className="price-direction"
            style={{
              fontWeight: "bold",
              fontSize: 45,
              // color: direction === "up" ? "rgb(0 206 99)" : "rgb(206,0,0)",
            }}
          >£{player.newPrice}m</span>
          <span
            className="price-direction"
            style={{
              color: "#6a6868",
              fontSize: 35,
              textDecorationLine: "line-through"
            }}
          >£${direction === "up" ? player.newPrice - 0.1 : player.newPrice + 0.1}m</span>

          {/*<div style={{*/}
          {/*  display: "flex",*/}
          {/*  alignItems: "center",*/}
          {/*  justifyContent: "center",*/}
          {/*  gap: 5*/}
          {/*}} className="owned-by">*/}
          {/*  <FiUsers />*/}
          {/*  <span>{player.ownedBy}%</span>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
