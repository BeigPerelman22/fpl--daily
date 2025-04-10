import { PlayerModel } from "../models/player.model";
import React from "react";
import { playerTypeMap } from "../data/player-type.map";
import { Img } from "remotion";

type Props = {
  player: PlayerModel;
  direction: "up" | "down";
};

export const PriceCard: React.FC<Props> = ({ player, direction }) => {
  return (
    <div
      style={{
        marginTop: 30,
        borderRadius: 15,
        minWidth: 300,
        fontSize: 40,
        fontFamily:
          'ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
        display: "flex",
        width: "100%",
        alignItems: "center",
        border: "solid 1px green",
      }}
    >
      <div
        style={{
          backgroundColor: "whitesmoke",
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "220px",
          paddingLeft: "30px",
          paddingRight: "30px",
          borderRadius: 15,
        }}
      >
        <div style={{display: "flex", gap: 15, alignItems: "center"}}>
          <Img
            src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photoId}.png`}
            alt={player.name}
            style={{
              width: 120,
              height: 150,
              objectFit: "cover",
              borderRadius: 8,
              boxShadow: "0 0 5px rgba(255,255,255,0.5)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5,
            }}
          >
            <span
              style={{
                fontFamily:
                  'ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
                fontWeight: 500,
              }}
            >
              {player.name}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                gap: 5,
              }}
            >
              <span
                style={{
                  backgroundColor: "rgb(0 206 99)",
                  width: "120px",
                  color: 'white',
                  borderRadius: 15,
                  padding: "5px",
                }}
              >
                {playerTypeMap[player.positionType]}
              </span>
              <span>•</span>
              <span style={{color: direction === 'up' ?  "rgb(0 206 99)" : "rgb(206,0,0)" }}>
                £{player.newPrice}m {direction === 'up' ? '↑' : '↓' }
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: direction === 'up' ?  "rgb(0 206 99)" : "rgb(206,0,0)" }}>
            {direction === "up" ? "+" : "-"}
            £0.1m
          </span>
          <span
            style={{
              fontSize: 30,
              color: "#6a6868",
            }}
          >
            Owned By: {player.ownedBy}%
          </span>
        </div>
      </div>
    </div>
  );
};
