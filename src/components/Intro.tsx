import { Audio, Img, Sequence, staticFile, useVideoConfig } from "remotion";
import { IntroTitle } from "./IntroTitle";
import { getFormattedDate } from "../lib/utils";

export const Intro = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <Img
        src={staticFile("assets/images/logo.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Sequence durationInFrames={fps * 3}>
        <Audio src={staticFile("assets/audio/intro.mp3")}></Audio>
      </Sequence>
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 130,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IntroTitle title={getFormattedDate()} />
      </div>
    </>
  );
};
