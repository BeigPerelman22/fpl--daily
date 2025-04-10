import { AbsoluteFill, Audio, Img, staticFile } from "remotion";
import { Title } from "./components/Title";
import { UpPriceList } from "./components/UpPriceList";
import { DownPriceList } from "./components/DownPriceList";
import { Outro } from "./components/Outro";
import { getFormattedDate } from "./lib/utils";

export const FplPriceChangesVideo: React.FC = () => {
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
            filter: "blur(15px)",
          }}
          alt="Background"
        />
        <Audio src={staticFile("assets/music.mp3")}></Audio>
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
