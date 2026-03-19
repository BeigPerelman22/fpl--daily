import { interpolate, spring } from "remotion";
import {
  FADE_IN_DURATION_FRAMES,
  SPRING_CARD_DAMPING,
  SPRING_CARD_MASS,
  SPRING_CARD_STIFFNESS,
} from "../lib/video-constants";

export function useCardAnimation(localFrame: number, fps: number) {
  const opacity = interpolate(
    localFrame,
    [0, FADE_IN_DURATION_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const slideX = interpolate(
    localFrame,
    [0, FADE_IN_DURATION_FRAMES],
    [80, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scale = spring({
    frame: localFrame,
    fps,
    config: {
      damping: SPRING_CARD_DAMPING,
      stiffness: SPRING_CARD_STIFFNESS,
      mass: SPRING_CARD_MASS,
    },
    durationInFrames: FADE_IN_DURATION_FRAMES,
  });

  return { opacity, slideX, scale };
}
