export function generateCommentary(
  playerName: string,
  newPrice: number,
  isPriceIncrease: boolean
): string {
  const verb = isPriceIncrease ? "rises" : "drops";
  return `${playerName} ${verb} to ${newPrice.toFixed(1)}`;
}
