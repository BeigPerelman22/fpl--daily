import fs from "fs";
import path from "path";
import { google } from "googleapis";
import { getFormattedDate } from "../lib/utils";

const CREDENTIALS_PATH = path.join(__dirname, "client_secret.json");
const TOKEN_PATH = path.join(__dirname, "token.json");

async function loadSavedCredentials() {
  const content = fs.readFileSync(CREDENTIALS_PATH, "utf-8");
  const credentials = JSON.parse(content);
  const { client_id, client_secret, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  oAuth2Client.setCredentials(token);

  return oAuth2Client;
}

async function uploadVideo() {
  const auth = await loadSavedCredentials();
  const youtube = google.youtube({ version: "v3", auth });

  const formattedDate = getFormattedDate();
  const videoTitle = `FPL Price Changes ${formattedDate} – Latest Player Updates!`;
  const videoDescription = `Here are all the Fantasy Premier League (FPL) price changes for ${formattedDate}, 2025!
Find out which FPL players went up in price and who took a price drop overnight. Perfect info to help you plan your next transfer before the deadline! ⏰

📈 Daily price rises & drops
⚽ Gameweek strategy tips
🔥 Stay ahead of the curve

👉 Like & subscribe for your daily FPL updates!

#FPL #FPLPriceChanges #FantasyPremierLeague #FPLTips #GameweekUpdates #FPLShorts #FPLDaily #FPL2025`;

  const videoPath = `./out/fpl-price-changes-${formattedDate}.mp4`;

  const res = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: videoTitle,
        description: videoDescription,
        categoryId: "24",
      },
      status: {
        privacyStatus: "public",
      },
    },
    media: {
      body: fs.createReadStream(videoPath),
    },
  });

  const videoId = res.data.id;
  console.log(`✅ Video uploaded! Video ID: ${videoId}`);
  console.log(`📺 https://www.youtube.com/watch?v=${videoId}`);
}

uploadVideo().catch(console.error);
