export const getFormattedDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date();
  return date.toLocaleDateString('en-US', options); // Format the date as "Month Day, Year"
};

export function chunkPlayers<T>(players: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < players.length; i += size) {
    chunks.push(players.slice(i, i + size));
  }
  return chunks;
}

