export const getFormattedDate = () => {
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

export function chunkPlayers<T>(players: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < players.length; i += size) {
    chunks.push(players.slice(i, i + size));
  }
  return chunks;
}
