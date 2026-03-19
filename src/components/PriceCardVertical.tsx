import { type FC } from "react";
import { PlayerModel } from "../models/player.model";
import { PlayerPhoto } from "./ui/PlayerPhoto";
import { PositionBadge } from "./ui/PositionBadge";
import { OwnershipBadge } from "./ui/OwnershipBadge";
import { ClubInfo } from "./ui/ClubInfo";
import { PriceDisplay } from "./ui/PriceDisplay";
import { PriceDirection } from "../types/direction";
import { COLOR_PRICE_UP, COLOR_PRICE_DOWN } from "../lib/video-constants";

type Props = {
  player: PlayerModel;
  direction: PriceDirection;
};

const accentColor = (direction: PriceDirection) =>
  direction === "up" ? COLOR_PRICE_UP : COLOR_PRICE_DOWN;

export const PriceCardVertical: FC<Props> = ({ player, direction }) => (
  <div
    className="flex flex-col items-center bg-bg-card rounded-[32px] py-12 px-10 w-[960px] gap-6"
    style={{ borderTop: `6px solid ${accentColor(direction)}` }}
  >
    <PlayerPhoto photoId={player.photoId} name={player.name} size={440} />
    <span className="text-white font-semibold text-[68px] font-space-grotesk text-center">
      {player.name}
    </span>
    <div className="flex items-center gap-5">
      <PositionBadge positionType={player.positionType} />
      <OwnershipBadge ownedBy={player.ownedBy} />
    </div>
    <ClubInfo teamId={player.teamId} teamName={player.teamName} />
    <PriceDisplay newPrice={player.newPrice} direction={direction} />
    {player.commentary && (
      <span className="text-white/60 text-[32px] text-center italic max-w-[800px] mt-3">
        {player.commentary}
      </span>
    )}
  </div>
);
