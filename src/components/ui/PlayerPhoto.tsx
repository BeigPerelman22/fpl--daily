import React, { useState } from "react";
import { Img, staticFile } from "remotion";

type Props = {
  photoId: string;
  name: string;
  size?: number;
};

export const PlayerPhoto: React.FC<Props> = ({ photoId, name, size = 160 }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Img
      src={
        hasError
          ? staticFile("assets/player-placeholder.svg")
          : `https://resources.premierleague.com/premierleague/photos/players/110x140/p${photoId}.png`
      }
      alt={name}
      onError={() => setHasError(true)}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        borderRadius: 16,
        backgroundColor: "hsl(220 15% 18%)",
      }}
    />
  );
};
