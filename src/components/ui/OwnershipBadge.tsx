import React from "react";
import { FiUsers } from "react-icons/fi";

type Props = {
  ownedBy: number;
};

export const OwnershipBadge: React.FC<Props> = ({ ownedBy }) => (
  <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#9E9E9E", fontSize: 38 }}>
    <FiUsers />
    {ownedBy}%
  </span>
);
