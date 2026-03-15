import fs from "fs";
import { generateCommentary } from "../lib/commentary";

const PRICE_CHANGES_FILE = "public/assets/price-changes.json";

async function addCommentary() {
  try {
    // Read the price changes file
    const data = JSON.parse(fs.readFileSync(PRICE_CHANGES_FILE, "utf8"));

    // Add commentary to price increases
    data.priceUps = data.priceUps.map((player: any) => ({
      ...player,
      commentary: generateCommentary(player.name, player.newPrice, true)
    }));

    // Add commentary to price decreases
    data.priceDowns = data.priceDowns.map((player: any) => ({
      ...player,
      commentary: generateCommentary(player.name, player.newPrice, false)
    }));

    // Write back to file
    fs.writeFileSync(PRICE_CHANGES_FILE, JSON.stringify(data, null, 2));
    console.log("✅ Commentary added to price changes");
  } catch (error) {
    console.error("Error adding commentary:", error);
    throw error;
  }
}

addCommentary();
