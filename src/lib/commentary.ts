export function generateCommentary(
  playerName: string,
  newPrice: number,
  isPriceIncrease: boolean
): string {
  const verb = isPriceIncrease ? "rises" : "drops";
  return `${playerName} ${verb} to ${newPrice.toFixed(1)}`;
}

export function getIntroCommentaryText(date: string): string {
  return `Hello FPL managers! Here are the player price changes for ${date}!`;
}

export const OUTRO_COMMENTARY_TEXT =
  "That's all for today! Like and subscribe for more daily FPL price changes!";
