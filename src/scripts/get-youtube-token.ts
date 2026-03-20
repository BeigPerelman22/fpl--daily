import path from "path";
import fs from "fs/promises";
import { authenticate } from "@google-cloud/local-auth";

async function main() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "client_secret.json"),
    scopes: ["https://www.googleapis.com/auth/youtube.upload"],
  });

  const credentials = auth.credentials;

  // Save the credentials for later use
  await fs.writeFile("token.json", JSON.stringify(credentials, null, 2));

  console.log("✅ Token saved to token.json");
}

main().catch(console.error);
