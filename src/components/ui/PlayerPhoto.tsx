import { type FC } from "react";
import { Img, staticFile } from "remotion";
import { useImageFallback } from "../../hooks/useImageFallback";
import { PLAYER_PHOTO_BASE_URL } from "../../lib/video-constants";

type Props = {
  photoId: string;
  name: string;
  size?: number;
};

export const PlayerPhoto: FC<Props> = ({ photoId, name, size = 160 }) => {
  const { src, onError } = useImageFallback(
    `${PLAYER_PHOTO_BASE_URL}/${photoId}.png`,
    staticFile("assets/player-placeholder.svg"),
  );

  return (
    <Img
      src={src}
      alt={name}
      onError={onError}
      style={{ width: size, height: size }}
      className="object-contain rounded-[16px] bg-bg-photo"
    />
  );
};
