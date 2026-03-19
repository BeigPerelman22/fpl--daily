import { type FC } from "react";
import { POSITION_MAP } from "../../data/position.map";

type Props = {
  positionType: number;
};

export const PositionBadge: FC<Props> = ({ positionType }) => {
  const position = POSITION_MAP[positionType] ?? { label: "???", color: "#FFFFFF" };

  return (
    <span
      className="font-bold text-[34px] rounded-[12px] py-2 px-6 tracking-[1px] text-bg-card"
      style={{ backgroundColor: position.color }}
    >
      {position.label}
    </span>
  );
};
