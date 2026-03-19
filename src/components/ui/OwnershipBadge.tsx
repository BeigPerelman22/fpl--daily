import { type FC } from "react";
import { FiUsers } from "react-icons/fi";

type Props = {
  ownedBy: number;
};

export const OwnershipBadge: FC<Props> = ({ ownedBy }) => (
  <span className="flex items-center gap-[6px] text-text-muted text-[38px]">
    <FiUsers />
    {ownedBy}%
  </span>
);
