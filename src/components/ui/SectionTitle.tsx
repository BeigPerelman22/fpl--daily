import { type FC } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clsx } from "clsx";
import { PriceDirection } from "../../types/direction";

type Props = {
  direction: PriceDirection;
};

export const SectionTitle: FC<Props> = ({ direction }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isUp = direction === "up";

  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, config: { damping: 22, stiffness: 100 } });

  return (
    <div
      className="flex flex-col items-center gap-3 mb-8"
      style={{ opacity, transform: `translateY(${slideY}px) scale(${scale})` }}
    >
      <span className="text-white/45 text-[36px] font-light tracking-[14px] uppercase font-poppins">
        PRICE
      </span>
      <span
        className={clsx(
          "gradient-text text-[96px] font-black tracking-[4px] uppercase font-space-grotesk",
          isUp
            ? "bg-[linear-gradient(135deg,#00FF87_0%,#00D4FF_100%)]"
            : "bg-[linear-gradient(135deg,#FF3131_0%,#FF6B35_100%)]",
        )}
      >
        {isUp ? "RISES" : "FALLS"}
      </span>
      <div
        className={clsx(
          "w-[140px] h-[3px] rounded-[3px]",
          isUp
            ? "bg-[linear-gradient(90deg,transparent,#00FF87,transparent)]"
            : "bg-[linear-gradient(90deg,transparent,#FF3131,transparent)]",
        )}
      />
    </div>
  );
};
