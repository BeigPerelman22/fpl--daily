import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PriceCard } from "./PriceCard";
import { PlayerModel } from "../models/player.model";
import "./PriceList.css";

type Props = {
  title: string;
  players: PlayerModel[];
  direction: "up" | "down";
  color: string;
  startTimeInSeconds: number;
};

export const PriceList: React.FC<Props> = ({
                                             title,
                                             players,
                                             direction,
                                             color,
                                             startTimeInSeconds,
                                           }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const durationInSeconds = Math.min(players.length * 2, 10);
  const sequenceStart = fps * startTimeInSeconds;
  const totalDurationInFrames = Math.ceil(durationInSeconds * fps);

  const opacity = interpolate(
    frame,
    [sequenceStart, sequenceStart + 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Sequence from={sequenceStart} durationInFrames={totalDurationInFrames}>
      <div className="price-list-container">
        <div className="price-list-title" style={{ color, opacity }}>
          {title}
        </div>
        <div className="price-list-content" style={{ opacity }}>
          {players.map((player, i) => (
            <PriceCard key={i} player={player} direction={direction} />
          ))}
        </div>
      </div>
    </Sequence>
  );
};
