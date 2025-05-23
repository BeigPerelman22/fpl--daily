import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { UpPriceList } from "./components/UpPriceList";
import { DownPriceList } from "./components/DownPriceList";
import { Outro } from "./components/Outro";
import { BASE_START_TIME_SECONDS } from "./lib/VideoConstants";
import { Intro } from "./components/Intro";
import { ProgressBar } from "./components/ProgressBar";

export const FplPriceChangesVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  const fadeInSeconds = 2;
  const fadeInFrames = fadeInSeconds * fps;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "Poppins, sans-serif",
        color: "white",
        flexDirection: "column",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <ProgressBar introDurationInFrames={fps * BASE_START_TIME_SECONDS}/>
      <Sequence from={fps * BASE_START_TIME_SECONDS}>
        <Audio startFrom={fps * 15}
          volume={(frame) =>
            interpolate(frame, [0, fadeInFrames], [0.1, 0.5], {
              extrapolateRight: "clamp",
            })
          }
          src={staticFile("assets/audio/music.mp3")}
        ></Audio>
      </Sequence>

      <Intro></Intro>
      <Sequence from={fps * BASE_START_TIME_SECONDS}>
        <Img
          src={staticFile("assets/images/new-background.png")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            filter: "blur(10px)",
          }}
        ></Img>
      </Sequence>
      <DownPriceList></DownPriceList>
      <UpPriceList></UpPriceList>
      <Outro></Outro>
    </AbsoluteFill>
  );
};
