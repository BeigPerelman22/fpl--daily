import { type FC } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { PriceDirection } from "../../types/direction";
import { COLOR_PRICE_UP, COLOR_PRICE_DOWN } from "../../lib/video-constants";

type Props = {
  newPrice: number;
  direction: PriceDirection;
};

export const PriceDisplay: FC<Props> = ({ newPrice, direction }) => {
  const isUp = direction === "up";
  const accentColor = isUp ? COLOR_PRICE_UP : COLOR_PRICE_DOWN;
  const oldPrice = isUp
    ? parseFloat((newPrice - 0.1).toFixed(1))
    : parseFloat((newPrice + 0.1).toFixed(1));

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[38px] flex items-center gap-2" style={{ color: accentColor }}>
        {isUp ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
        {isUp ? "+0.1m" : "-0.1m"}
      </span>
      <span className="text-white font-bold text-[80px]">£{newPrice}m</span>
      <span className="text-text-muted text-[50px] line-through">£{oldPrice}m</span>
    </div>
  );
};
