import { type FC } from "react";
import { Img, staticFile } from "remotion";
import { useImageFallback } from "../../hooks/useImageFallback";
import { CLUB_BADGE_BASE_URL } from "../../lib/video-constants";

type Props = {
  teamId: number;
  teamName: string;
};

export const ClubInfo: FC<Props> = ({ teamId, teamName }) => {
  const { src, onError } = useImageFallback(
    `${CLUB_BADGE_BASE_URL}/${teamId}.svg`,
    staticFile("assets/club-placeholder.svg"),
  );

  return (
    <div className="flex items-center gap-4">
      <Img src={src} alt={teamName} onError={onError} className="w-14 h-14 object-contain" />
      <span className="text-text-muted text-[40px]">{teamName}</span>
    </div>
  );
};
