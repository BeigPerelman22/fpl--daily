import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import dotenv from "dotenv";
import { getIntroCommentaryText, OUTRO_COMMENTARY_TEXT } from "../lib/commentary";

dotenv.config();

const PRICE_CHANGES_FILE = "public/assets/price-changes.json";
const OUTPUT_DIR = "public/assets/audio/commentary";
const AUDIO_DIR = "public/assets/audio";

// Charlie — casual, conversational, young. Great for YouTube/streamer content.
// Swap this ID for any ElevenLabs voice at: https://elevenlabs.io/voice-library
const VOICE_ID = "FmJ4FDkdrYIKzBTruTkV";

async function generateTTS() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "❌ ELEVENLABS_API_KEY env var is not set.\n" +
      "Get your free key at https://elevenlabs.io and set it with:\n" +
      "  set ELEVENLABS_API_KEY=your_key_here  (Windows)\n" +
      "  export ELEVENLABS_API_KEY=your_key_here  (Mac/Linux)"
    );
  }

  const client = new ElevenLabsClient({ apiKey });

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const data = JSON.parse(fs.readFileSync(PRICE_CHANGES_FILE, "utf8"));
  const allPlayers = [...data.priceUps, ...data.priceDowns];
  const playersWithCommentary = allPlayers.filter((p: any) => p.commentary);

  console.log(`🎙️ Generating ElevenLabs TTS for ${playersWithCommentary.length} players...`);

  for (const player of playersWithCommentary) {
    const outputPath = path.join(OUTPUT_DIR, `${player.id}.mp3`);

    const audioStream = await client.textToSpeech.convert(VOICE_ID, {
      text: player.commentary,
      modelId: "eleven_turbo_v2_5",
      outputFormat: "mp3_44100_128",
      voiceSettings: {
        stability: 0.35,
        similarityBoost: 0.8,
        style: 0.65,
        useSpeakerBoost: true,
      },
    });

    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(outputPath);
      Readable.from(audioStream as unknown as AsyncIterable<Uint8Array>).pipe(writeStream);
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log(`✅ ${player.name} → ${outputPath}`);
  }

  // Generate intro commentary
  const dateStr = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const introText = getIntroCommentaryText(dateStr);
  console.log(`🎙️ Generating intro commentary: "${introText}"`);
  const introStream = await client.textToSpeech.convert(VOICE_ID, {
    text: introText,
    modelId: "eleven_turbo_v2_5",
    outputFormat: "mp3_44100_128",
    voiceSettings: { stability: 0.35, similarityBoost: 0.8, style: 0.65, useSpeakerBoost: true },
  });
  await new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(path.join(AUDIO_DIR, "intro_commentary.mp3"));
    Readable.from(introStream as unknown as AsyncIterable<Uint8Array>).pipe(ws);
    ws.on("finish", resolve);
    ws.on("error", reject);
  });
  console.log(`✅ Intro commentary → ${AUDIO_DIR}/intro_commentary.mp3`);

  // Generate outro commentary
  console.log(`🎙️ Generating outro commentary: "${OUTRO_COMMENTARY_TEXT}"`);
  const outroStream = await client.textToSpeech.convert(VOICE_ID, {
    text: OUTRO_COMMENTARY_TEXT,
    modelId: "eleven_turbo_v2_5",
    outputFormat: "mp3_44100_128",
    voiceSettings: { stability: 0.35, similarityBoost: 0.8, style: 0.65, useSpeakerBoost: true },
  });
  await new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(path.join(AUDIO_DIR, "outro_commentary.mp3"));
    Readable.from(outroStream as unknown as AsyncIterable<Uint8Array>).pipe(ws);
    ws.on("finish", resolve);
    ws.on("error", reject);
  });
  console.log(`✅ Outro commentary → ${AUDIO_DIR}/outro_commentary.mp3`);

  console.log("🎉 ElevenLabs TTS generation complete!");
}

generateTTS().catch((err) => {
  console.error("TTS generation failed:", err.message ?? err);
  process.exit(1);
});
