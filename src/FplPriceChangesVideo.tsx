import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Title } from "./components/Title";
import { UpPriceList } from "./components/UpPriceList";
import { DownPriceList } from "./components/DownPriceList";
import { Outro } from "./components/Outro";
import { getFormattedDate } from "./lib/utils";

export const FplPriceChangesVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  const fadeInSeconds = 2;
  const fadeInFrames = fadeInSeconds * fps;

  return (
    <AbsoluteFill
      style={{
        height: "100%",
        fontFamily: "Poppins, sans-serif",
        color: "white",
        flexDirection: "column",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <div>
        <Img
          src={staticFile("assets/background-1.png")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            filter: "blur(20px)",
          }}
          alt="Background"
        />
        <Sequence durationInFrames={fps * 3}>
          <Audio src={staticFile("assets/intro.mp3")}></Audio>
        </Sequence>
        <Sequence from={fps * 2}>
          <Audio
            volume={(frame) =>
              interpolate(frame, [0, fadeInFrames], [0.1, 1], {
                extrapolateRight: "clamp",
              })
            }
            src={staticFile("assets/beat.mp3")}
          ></Audio>
        </Sequence>
        <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 130 }}>
          <Title
            title={"Player Price Changes"}
            subTitle={getFormattedDate()}
          ></Title>
        </div>
        <DownPriceList></DownPriceList>
        <UpPriceList></UpPriceList>
        <Outro></Outro>
        <Img
          src={staticFile("assets/logo.png")}
          style={{
            zIndex: 2,
            position: "absolute",
            bottom: 40,
            left: 40,
            height: 100,
            width: 100,
            borderRadius: 50,
            border: "solid black 5px",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
