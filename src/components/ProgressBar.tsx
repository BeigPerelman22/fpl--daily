import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type ProgressBarProps = {
  introDurationInFrames: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ introDurationInFrames }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(
    frame,
    [introDurationInFrames, durationInFrames],
    [0, 100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '10px',
        backgroundColor: '#00A650',
        width: `${progress}%`,
      }}
    />
  );
};
