import fetch from "node-fetch";
import fs from "fs";
import { ApiPlayer } from "../models/ApiPlayer";
import { TeamModel } from "../models/team.model";

const API_URL = "https://fantasy.premierleague.com/api/bootstrap-static/";
const OUTPUT_FILE = "public/assets/price-changes.json";
const CACHE_FILE = "src/data/yesterday-players.json";

async function getPriceChanges() {
  const res = await fetch(API_URL);
  const data: { elements: ApiPlayer[], teams: TeamModel[] } = (await res.json()) as {
    elements: ApiPlayer[];
    teams: TeamModel[];
  };
  const players: ApiPlayer[] = data.elements;
  const teams: TeamModel[] = data.teams;

  const today: Record<number, number> = {};

  let yesterday: Record<number, number> = {};
  if (fs.existsSync(CACHE_FILE)) {
    yesterday = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  }

  const priceUps = [];
  const priceDowns = [];

  for (const p of players) {
    today[p.id] = p.now_cost;

    const oldPrice = yesterday[p.id];
    const newPrice = p.now_cost;
    if (oldPrice != null && newPrice !== oldPrice) {
      const entry = {
        id: p.id,
        name: p.web_name,
        newPrice: newPrice / 10,
        photoId: p.photo.replace(".jpg", ""),
        positionType: p.element_type,
        news: p.news,
        ownedBy: +p.selected_by_percent,
        teamId: p.team_code,
        teamName: teams.find(team => team.code === p.team_code)?.name
      };
      if (newPrice > oldPrice) priceUps.push(entry);
      else priceDowns.push(entry);
    }
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(today, null, 2));
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify({ priceUps, priceDowns }, null, 2),
  );

  console.log("✅ Price change data saved to", OUTPUT_FILE);
}

getPriceChanges();
