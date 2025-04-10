import fs from 'fs';
import path from 'path';
import https from 'https';

const FPL_API_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';

type Player = {
  id: number;
  first_name: string;
  second_name: string;
  now_cost: number;
};

type PlayerSnapshotRecord = Record<number, number>;

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function fetchAndSaveInitialPrices() {
  console.log('Fetching FPL data...');
  const response = await fetchJson<{ elements: Player[] }>(FPL_API_URL);
  const players = response.elements;

  const snapshot: PlayerSnapshotRecord = players.reduce((acc, p) => {
    acc[p.id] = p.now_cost;
    return acc;
  }, {} as PlayerSnapshotRecord);

  const outputPath = path.join('src/data', `yesterday-players.json`);

  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

  console.log(`Saved  player prices to ${outputPath}`);
}

fetchAndSaveInitialPrices().catch(err => {
  console.error('Error fetching player prices:', err);
});
