import React from "react";
import { Img } from "remotion";

type Props = {
  teamId: number;
  teamName: string;
};

export const ClubInfo: React.FC<Props> = ({ teamId, teamName }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <Img
      src={`https://resources.premierleague.com/premierleague/badges/rb/t${teamId}.svg`}
      alt={teamName}
      style={{ width: 36, height: 36 }}
    />
    <span style={{ color: "#9E9E9E", fontSize: 26 }}>{teamName}</span>
  </div>
);
