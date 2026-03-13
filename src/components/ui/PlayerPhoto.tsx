import React from "react";
import { Img } from "remotion";

type Props = {
  photoId: string;
  name: string;
  size?: number;
};

export const PlayerPhoto: React.FC<Props> = ({ photoId, name, size = 160 }) => (
  <Img
    src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${photoId}.png`}
    alt={name}
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      borderRadius: 16,
      backgroundColor: "hsl(220 15% 18%)",
    }}
  />
);
