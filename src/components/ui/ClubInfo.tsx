import React, { useState } from "react";
import { Img, staticFile } from "remotion";

type Props = {
  teamId: number;
  teamName: string;
};

export const ClubInfo: React.FC<Props> = ({ teamId, teamName }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Img
        src={
          hasError
            ? staticFile("assets/club-placeholder.svg")
            : `https://resources.premierleague.com/premierleague25/badges-alt/${teamId}.svg`
        }
        alt={teamName}
        onError={() => setHasError(true)}
        style={{ width: 36, height: 36 }}
      />
      <span style={{ color: "#9E9E9E", fontSize: 26 }}>{teamName}</span>
    </div>
  );
};
