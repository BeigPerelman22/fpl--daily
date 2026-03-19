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

const borderAlpha = (direction: PriceDirection) =>
  direction === "up" ? "rgba(0,255,135,0.25)" : "rgba(255,49,49,0.25)";

const stripeColor = (direction: PriceDirection) =>
  direction === "up" ? COLOR_PRICE_UP : COLOR_PRICE_DOWN;

export const PriceCardHorizontal: FC<Props> = ({ player, direction }) => (
  <div
    className="flex items-center justify-between bg-bg-card rounded-[16px] py-5 px-[30px] w-full mt-5 gap-5"
    style={{
      border: `1px solid ${borderAlpha(direction)}`,
      borderLeft: `6px solid ${stripeColor(direction)}`,
    }}
  >
    {/* Left: photo */}
    <PlayerPhoto photoId={player.photoId} name={player.name} size={160} />

    {/* Middle: player info */}
    <div className="flex-1 flex flex-col gap-[10px] items-start">
      <div className="flex items-center gap-4">
        <PositionBadge positionType={player.positionType} />
        <OwnershipBadge ownedBy={player.ownedBy} />
      </div>
      <span className="text-white font-semibold text-[38px] font-space-grotesk">
        {player.name}
      </span>
      <ClubInfo teamId={player.teamId} teamName={player.teamName} />
      {player.commentary && (
        <span className="text-white/60 text-[24px] italic mt-2">
          {player.commentary}
        </span>
      )}
    </div>

    {/* Right: price */}
    <PriceDisplay newPrice={player.newPrice} direction={direction} />
  </div>
);
