import fs from "fs";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { getFormattedDate } from "../lib/utils";

async function uploadVideo() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "client_secret.json"),
    scopes: ["https://www.googleapis.com/auth/youtube.upload"],
  });

  const youtube = google.youtube({ version: "v3", auth });

  const res = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: `FPL Price Changes ${getFormattedDate()} – Latest Player Updates!`,
        description: `Here are all the Fantasy Premier League (FPL) price changes for ${getFormattedDate()}, 2025!
Find out which FPL players went up in price and who took a price drop overnight. Perfect info to help you plan your next transfer before the deadline! ⏰

📈 Daily price rises & drops
⚽ Gameweek strategy tips
🔥 Stay ahead of the curve

👉 Like & subscribe for your daily FPL updates!

#FPL #FPLPriceChanges #FantasyPremierLeague #FPLTips #GameweekUpdates #FPLShorts #FPLDaily #FPL2025`,
        categoryId: "24",
      },
      status: {
        privacyStatus: "public",
      },
    },
    media: {
      body: fs.createReadStream(`./out/fpl-price-changes-${getFormattedDate()}.mp4`), // adjust this if your rendered video is somewhere else
    },
  });

  console.log(`✅ Video uploaded! Video ID: ${res.data.id}`);
  console.log(`📺 https://www.youtube.com/watch?v=${res.data.id}`);
}

uploadVideo().catch(console.error);
