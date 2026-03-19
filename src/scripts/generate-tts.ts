import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import dotenv from "dotenv";
import { getIntroCommentaryText, OUTRO_COMMENTARY_TEXT } from "../lib/commentary";
import { PlayerModel } from "../models/player.model";

dotenv.config();

const PRICE_CHANGES_FILE = "public/assets/price-changes.json";
const OUTPUT_DIR = "public/assets/audio/commentary";
const AUDIO_DIR = "public/assets/audio";

// Free ElevenLabs pre-made male voices — American & British, YouTube/entertainment style
const VOICES = [
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },  // American, casual/conversational
  { id: "pNInz6obpgDQGcFmaJgB", name: "Adam" },      // American, deep narrator
  { id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam" },      // American, clean narrator
  { id: "VR6AewLTigWG4xSOukaG", name: "Arnold" },    // American, crisp
  { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },    // British, deep/authoritative
  { id: "CYw3kZ02Genyk0W6gQAr", name: "Dave" },      // British-Essex, conversational
  { id: "ODq5zmih8GrVes37Dx9R", name: "Patrick" },   // British male
  { id: "GBv7mTt0atIp3Br8iCZE", name: "Thomas" },    // British, calm
];

const DEFAULT_VOICE_SETTINGS = {
  stability: 0.35,
  similarityBoost: 0.8,
  style: 0.65,
  useSpeakerBoost: true,
} as const;

const TTS_OPTIONS = {
  modelId: "eleven_turbo_v2_5",
  outputFormat: "mp3_44100_128",
  voiceSettings: DEFAULT_VOICE_SETTINGS,
} as const;

function getDailyVoice() {
  const today = new Date();
  const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return VOICES[daySeed % VOICES.length];
}

async function streamToFile(stream: AsyncIterable<Uint8Array>, filePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    Readable.from(stream).pipe(ws);
    ws.on("finish", resolve);
    ws.on("error", reject);
  });
}

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

  const voice = getDailyVoice();
  console.log(`🎤 Today's voice: ${voice.name} (${voice.id})`);

  const data = JSON.parse(fs.readFileSync(PRICE_CHANGES_FILE, "utf8"));
  const allPlayers: PlayerModel[] = [...data.priceUps, ...data.priceDowns];
  const playersWithCommentary = allPlayers.filter((p) => p.commentary);

  console.log(`🎙️ Generating combined commentary for ${playersWithCommentary.length} players...`);
  const combinedText = playersWithCommentary.map((p) => p.commentary).join(". ");
  const combinedStream = await client.textToSpeech.convert(voice.id, { text: combinedText, ...TTS_OPTIONS });
  await streamToFile(combinedStream as unknown as AsyncIterable<Uint8Array>, path.join(OUTPUT_DIR, "all-players.mp3"));
  console.log(`✅ Combined players commentary → ${OUTPUT_DIR}/all-players.mp3`);

  const dateStr = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const introText = getIntroCommentaryText(dateStr);
  console.log(`🎙️ Generating intro commentary: "${introText}"`);
  const introStream = await client.textToSpeech.convert(voice.id, { text: introText, ...TTS_OPTIONS });
  await streamToFile(introStream as unknown as AsyncIterable<Uint8Array>, path.join(AUDIO_DIR, "intro_commentary.mp3"));
  console.log(`✅ Intro commentary → ${AUDIO_DIR}/intro_commentary.mp3`);

  console.log(`🎙️ Generating outro commentary: "${OUTRO_COMMENTARY_TEXT}"`);
  const outroStream = await client.textToSpeech.convert(voice.id, { text: OUTRO_COMMENTARY_TEXT, ...TTS_OPTIONS });
  await streamToFile(outroStream as unknown as AsyncIterable<Uint8Array>, path.join(AUDIO_DIR, "outro_commentary.mp3"));
  console.log(`✅ Outro commentary → ${AUDIO_DIR}/outro_commentary.mp3`);

  console.log("🎉 ElevenLabs TTS generation complete!");
}

generateTTS().catch((err) => {
  console.error("TTS generation failed:", err.message ?? err);
  process.exit(1);
});
